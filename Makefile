start:
	docker-compose build
	docker-compose up -d

stop:
	docker-compose stop

restart: stop start

clean:
	docker-compose down -v

bash:
	docker-compose run --rm --service-ports web
