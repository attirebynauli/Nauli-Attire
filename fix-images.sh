#!/bin/bash
# Jalankan di root project

# 1. Rename files (contoh untuk edita)
find image -name "* *" -exec bash -c '
    for f; do
        newname=$(echo "$f" | tr " " "-" | tr "[:upper:]" "[:lower:]")
        mv "$f" "$newname"
    done
' bash {} +

# 2. Update HTML (manual atau gunakan sed/perl)
echo "Files renamed! Now update HTML paths manually or use find-replace."
