package edu.ucsb.cs156.example.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
  info = @Info(
<<<<<<< HEAD
  title = "UCSB CMPSC 156 f23, team03",
=======
  title = "UCSB CMPSC 156 f23, team02",
>>>>>>> c71d0c63bc4382959325d08774b23745c6e4c177
  description = """
    <p><a href='/'>Home Page</a></p>
    <p><a href='/h2-console'>H2 Console (only on localhost)</a></p>
    """     
    ),
  servers = @Server(url = "/")
)
class OpenAPIConfig {}