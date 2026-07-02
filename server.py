import os
import re
import sys
import shutil
import mimetypes
from http.server import SimpleHTTPRequestHandler, HTTPServer

class RangeRequestHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        """Common code for GET and HEAD commands to handle Range requests."""
        path = self.translate_path(self.path)
        
        # If the path is a directory, let the base class handle it
        if os.path.isdir(path):
            return super().send_head()
            
        # Parse the Range header if present
        range_header = self.headers.get('Range')
        if not range_header or not range_header.startswith('bytes='):
            return super().send_head()
            
        # Try to open the file
        try:
            f = open(path, 'rb')
        except OSError:
            self.send_error(404, "File not found")
            return None
            
        # Get file size
        fs = os.fstat(f.fileno())
        file_size = fs.st_size
        
        # Parse range values
        range_match = re.match(r'bytes=(\d*)-(\d*)', range_header)
        if not range_match:
            self.send_error(400, "Bad Request")
            f.close()
            return None
            
        start_str, end_str = range_match.groups()
        start = int(start_str) if start_str else 0
        end = int(end_str) if end_str else file_size - 1
        
        if start >= file_size or end >= file_size or start > end:
            self.send_error(416, "Requested Range Not Satisfiable")
            self.headers['Content-Range'] = f'bytes */{file_size}'
            f.close()
            return None
            
        # Send 206 Partial Content response
        self.send_response(206)
        self.send_header('Content-Type', self.guess_type(path))
        self.send_header('Content-Range', f'bytes {start}-{end}/{file_size}')
        self.send_header('Content-Length', str(end - start + 1))
        self.send_header('Accept-Ranges', 'bytes')
        self.end_headers()
        
        # Seek to start and prepare to return
        f.seek(start)
        self.range_start = start
        self.range_end = end
        return f

    def copyfile(self, source, outputfile):
        """Copy only the requested range of bytes."""
        if not hasattr(self, 'range_start'):
            super().copyfile(source, outputfile)
            return
            
        # Write only the requested range of bytes
        bytes_to_read = self.range_end - self.range_start + 1
        buffer_size = 64 * 1024
        while bytes_to_read > 0:
            to_read = min(buffer_size, bytes_to_read)
            buf = source.read(to_read)
            if not buf:
                break
            try:
                outputfile.write(buf)
            except Exception:
                break
            bytes_to_read -= len(buf)

if __name__ == '__main__':
    port = 8080
    bind_ip = '127.0.0.1'
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
    
    server_address = (bind_ip, port)
    mimetypes.init()
    # Add mapping for mp4 if missing
    if '.mp4' not in mimetypes.types_map:
        mimetypes.add_type('video/mp4', '.mp4')
        
    print(f"Starting custom development server on http://{bind_ip}:{port} with HTTP Range support...")
    httpd = HTTPServer(server_address, RangeRequestHandler)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server.")
        httpd.server_close()
