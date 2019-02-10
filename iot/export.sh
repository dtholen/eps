curl -u library:secret https://library:secret localhost/backup
tar cvzf config/backup/archiv/$(date '+%Y%m%d')library_all.tgz config/backup/export
