CALL echo "1/3 cleaning resources"
CALL rmdir .next /s /q
CALL rmdir out /s /q

CALL echo "2/3 running yarn build"
CALL yarn build

CALL echo "3/3 exporting build"
CALL yarn export
