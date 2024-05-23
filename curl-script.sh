#!/bin/sh

# URL to test
URL="http://localhost:3000"

# Number of requests to send
REQUEST_COUNT=10000

# Send requests in a loop
for i in $(seq 1 $REQUEST_COUNT)
do
    curl -s $URL > /dev/null
    echo "Request #$i sent"
done
