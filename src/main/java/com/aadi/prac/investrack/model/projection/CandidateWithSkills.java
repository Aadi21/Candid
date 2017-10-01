package com.aadi.prac.investrack.model.projection;

import com.aadi.prac.investrack.model.*;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

/**
 * Created by aadi on 30/9/17.
 */
@Projection(name="inlineSkills", types={Candidate.class})
public interface CandidateWithSkills {

    String getName();
    String getEmail();
    String getContactNo();
    Address getAddress();
    Profile getProfile();
    Position getAppliedPosition();
    List<Skill> getSkills();

    //Audit
    Instant getCreatedOn();
    Instant getUpdatedOn();
    Long getVersion();
    String getCreatedBy();
    String getUpdatedBy();
}