package com.aadi.prac.investrack.validator;

import com.aadi.prac.investrack.model.Candidate;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

/**
 * Created by aadi on 12/9/17.
 */
@Component("beforeCreateCandidateValidator")
public class CandidateValidator implements Validator {
    @Override
    public boolean supports(Class<?> aClass) {
        return Candidate.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        Candidate candidate = (Candidate) o;
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "name", "name.empty");
        if (checkInputEmail(candidate.getEmail())) {
            errors.rejectValue("email", "email.empty");
        }

    }

    private boolean checkInputEmail(String input) {
        return (input == null || input.trim().length() == 0);
    }
}
