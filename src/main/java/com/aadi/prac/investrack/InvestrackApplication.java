package com.aadi.prac.investrack;

import com.aadi.prac.investrack.config.ValidatorEventRegister;
import com.aadi.prac.investrack.model.AuditorAwareImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@EnableJpaAuditing
@Import(ValidatorEventRegister.class)
public class InvestrackApplication {

	public static void main(String[] args) {
		SpringApplication.run(InvestrackApplication.class, args);
	}

	//Autoregister as AuditorAware. Used to provide createdBy/updatedBy fields
	@Bean
	public AuditorAware<String> auditorProvider(){
	    return new AuditorAwareImpl();
    }
}
