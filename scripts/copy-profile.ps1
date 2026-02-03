$src = 'C:\Users\noble\AppData\Local\Google\Chrome\User Data'
$dst = 'C:\Users\noble\ChromeX'

Remove-Item $dst -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path $dst -Force | Out-Null
New-Item -ItemType Directory -Path "$dst\Default" -Force | Out-Null
New-Item -ItemType Directory -Path "$dst\Default\Network" -Force | Out-Null

Copy-Item "$src\Local State" "$dst\Local State" -Force
Copy-Item "$src\Default\Cookies" "$dst\Default\Cookies" -Force -ErrorAction SilentlyContinue
Copy-Item "$src\Default\Preferences" "$dst\Default\Preferences" -Force -ErrorAction SilentlyContinue
Copy-Item "$src\Default\Secure Preferences" "$dst\Default\Secure Preferences" -Force -ErrorAction SilentlyContinue
Copy-Item "$src\Default\Login Data" "$dst\Default\Login Data" -Force -ErrorAction SilentlyContinue
Copy-Item "$src\Default\Login Data For Account" "$dst\Default\Login Data For Account" -Force -ErrorAction SilentlyContinue
Copy-Item "$src\Default\Network\Cookies" "$dst\Default\Network\Cookies" -Force -ErrorAction SilentlyContinue
Copy-Item "$src\Default\Network\TransportSecurity" "$dst\Default\Network\TransportSecurity" -Force -ErrorAction SilentlyContinue

Write-Host "Profile copied to $dst"
Get-ChildItem $dst -Recurse -File | ForEach-Object { Write-Host "  $($_.FullName) ($([math]::Round($_.Length/1MB,2)) MB)" }
