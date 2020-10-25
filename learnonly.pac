function FindProxyForURL(url, host)
 {
 if (dnsResolve(host) == "47.99.38.43") { // = https://www.learnonly.com
 return "PROXY secproxy:592";
 }
 else {
 return "DIRECT";
 }
 }