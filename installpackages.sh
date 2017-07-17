#!/bin/sh
#!/bin/bash -e
#__BEGIN__
#Original content copyright (c) 2014 dpen2000 licensed under the MIT license

#Message
echo "reboot server..."

#Upgrade npm
sudo npm install -g npm@latest # upgrade npm

#Mount node_modules in vagrant
sudo mount --bind /node_modules /vagrant/node_modules

#__END_MAIN__
