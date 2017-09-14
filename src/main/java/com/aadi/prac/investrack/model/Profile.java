package com.aadi.prac.investrack.model;

import javax.persistence.Embeddable;
import java.math.BigDecimal;

/**
 * Created by aadi on 12/9/17.
 */
@Embeddable
public class Profile {

    private String skills;
    private Float experienceInYrs;
    private BigDecimal expectedPrice;
    private String  resumeContent;

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public Float getExperienceInYrs() {
        return experienceInYrs;
    }

    public void setExperienceInYrs(Float experienceInYrs) {
        this.experienceInYrs = experienceInYrs;
    }

    public BigDecimal getExpectedPrice() {
        return expectedPrice;
    }

    public void setExpectedPrice(BigDecimal expectedPrice) {
        this.expectedPrice = expectedPrice;
    }

    public String getResumeContent() {
        return resumeContent;
    }

    public void setResumeContent(String resumeContent) {
        this.resumeContent = resumeContent;
    }
}
