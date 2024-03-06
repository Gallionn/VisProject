package edu.vis4.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@ComponentScan({"edu.vis4.controller","edu.vis4.config"})
@EnableWebMvc
public class SpringMvcConfig {

}