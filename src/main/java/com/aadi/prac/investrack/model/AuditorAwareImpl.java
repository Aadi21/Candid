package com.aadi.prac.investrack.model;

import org.springframework.data.domain.AuditorAware;

import java.util.Optional;

/**
 * Created by aadi on 12/9/17.
 */
public class AuditorAwareImpl implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        return Optional.of("Unimplemented");
    }
}
