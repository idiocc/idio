<!-- <include-typedefs>logarithm</include-typedefs> -->

<typedef narrow name="LogarithmOptions">types/options/index.xml</typedef>

<typedef narrow name="Config">node_modules/logarithm/types/index.xml</typedef>

Logarithm is a middleware to send hits information over to _ElasticSearch_ cluster. The data will include status, path and headers of the request. The default pipeline is assumed to be `info` (we set it up to include geo-ip and user-agent processors, see below), but can be disabled.

You might also want to install [`logarithm`](https://github.com/artdecocode/logarithm) binary to perform various operations on _ElasticSearch_, such as setting up a pipeline for the middleware, creating snapshots and executing queries.

%EXAMPLE: ./example/logarithm%

<fork lang="js">./example/logarithm</fork>