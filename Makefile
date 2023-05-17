dev:
	cd docker && docker-compose build --no-cache
	cd docker && docker-compose up -d
	cd ..

dev-down:
	cd docker && docker-compose down
	cd ..