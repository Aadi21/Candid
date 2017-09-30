package com.aadi.prac.investrack.model.projection;

import com.aadi.prac.investrack.model.*;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by aadi on 30/9/17.
 */
@Projection(name="inlineSkills", types={Position.class})
public interface PositionWithSkills {

    String getRoleName();

    String getDescription();

    Float getMinExperienceInYrsRequired();

    List<Skill> getRequiredSkills();

    BigDecimal getSalaryMax();

    PositionStatus getStatus();

}
