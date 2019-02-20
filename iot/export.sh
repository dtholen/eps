curl -u library:secret https://localhost/maintain/backup
tar cvzf config/backup/archive/$(date '+%Y%m%d')library_all.tgz config/backup/export
