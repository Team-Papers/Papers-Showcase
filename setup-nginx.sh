#!/bin/bash
# Run as root: sudo bash /home/softengine/papers-showcase/setup-nginx.sh
set -e

echo "=== Creating Nginx config for Papers Showcase ==="

cat > /etc/nginx/sites-available/papers-showcase <<'EOF'
server {
    listen 80;
    server_name showcase.papers237.duckdns.org;

    root /home/softengine/papers-showcase/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

ln -sf /etc/nginx/sites-available/papers-showcase /etc/nginx/sites-enabled/

echo "=== Testing Nginx config ==="
nginx -t

echo "=== Reloading Nginx ==="
systemctl reload nginx

echo "=== Done! ==="
echo "Site available at: http://showcase.papers237.duckdns.org"
echo ""
echo "To enable HTTPS, run:"
echo "  sudo certbot --nginx -d showcase.papers237.duckdns.org"
