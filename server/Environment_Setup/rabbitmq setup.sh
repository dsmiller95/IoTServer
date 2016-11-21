#downloads and install the latest rabbitmq server and configures it to allow MQTT access from external IPs
#Adds the needed aptitude repositories to a file, updates the local aptitude packages

echo 'deb http://www.rabbitmq.com/debian/ testing main' | sudo tee /etc/apt/sources.list.d/rabbitmq.list

echo 'deb http://packages.erlang-solutions.com/ubuntu precise contrib' | sudo tee /etc/apt/sources.list.d/rabbitmq.list -a


wget -O- https://www.rabbitmq.com/rabbitmq-release-signing-key.asc | sudo apt-key add -

wget -O- http://packages.erlang-solutions.com/ubuntu/erlang_solutions.asc | sudo apt-key add -

sudo apt-get update

sudo apt-get install rabbitmq-server -y



sudo rabbitmq-plugins enable rabbitmq_mqtt

sudo rabbitmqctl stop_app
sudo rabbitmqctl reset
sudo rabbitmqctl stop

echo "[{rabbit, [{loopback_users, []}]}]." | sudo tee /etc/rabbitmq/rabbitmq.config

sudo invoke-rc.d rabbitmq-server start
