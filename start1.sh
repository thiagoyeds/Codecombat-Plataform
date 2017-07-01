#!/bin/sh
#!/bin/bash -e
#__BEGIN__
#Original content copyright (c) 2014 dpen2000 licensed under the MIT license

#Upgrading npm
echo "reboot server..."
sudo npm install -g npm@latest # upgrade npm
sudo npm install -g bower
sudo npm install -g brunch
sudo npm install -g geoip-lite
sudo npm install -g nodemon

#bin /vagrant/node_modules so that it does not leak through to the host file system
#which triggers symlink and path size issues on Windows hosts
sudo mkdir -p /vagrant/node_modules
sudo chown -R vagrant:vagrant /node_modules
sudo mount --bind /node_modules /vagrant/node_modules

#prepare
find /vagrant/app -type f -exec dos2unix {} \;
find /vagrant/vendor -type f -exec dos2unix {} \;
find /vagrant/scripts/vagrant -type f -exec dos2unix {} \;
sudo chown -R vagrant:vagrant /home/vagrant

#__END_MAIN__
