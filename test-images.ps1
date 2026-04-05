$urls = @(
    @{id=1; name="Basic Subscription"; url="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3231802/ticket-icon-md.png"},
    @{id=2; name="Gold Subscription"; url="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3237088/ticket-icon-md.png"},
    @{id=3; name="Premium Subscription"; url="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3258730/ticket-icon-md.png"},
    @{id=4; name="Social Media"; url="https://cdn.creazilla.com/photos/3730387/social-media-1908766_1280-photo-md.jpeg"},
    @{id=5; name="EZ Tech T-Shirt"; url="https://cdn.creazilla.com/cliparts/5548105/tie-dye-t-shirt-clipart-md.png"},
    @{id=6; name="EZ Techplosion"; url="https://cdn.creazilla.com/cliparts/7487471/tie-dye-t-shirt-clipart-md.png"},
    @{id=7; name="EZ Techmerizing"; url="https://cdn.creazilla.com/cliparts/5632313/tie-dye-t-shirt-clipart-sm.png"},
    @{id=8; name="EZ Tech Case"; url="https://cdn.creazilla.com/9ef436f9e9e4cf2733c43b7e61d327d2.jpeg"}
)

foreach ($item in $urls) {
    try {
        $response = Invoke-WebRequest -Uri $item.url -Method Head -TimeoutSec 10
        Write-Host "✓ ID $($item.id) ($($item.name)): OK - Status $($response.StatusCode)" -ForegroundColor Green
    } catch {
        Write-Host "✗ ID $($item.id) ($($item.name)): BROKEN - $($_.Exception.Response.StatusCode)" -ForegroundColor Red
    }
}
