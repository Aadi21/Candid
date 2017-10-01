package com.aadi.prac.investrack.model;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

/**
 * Created by aadi on 12/9/17.
 */
@Embeddable
public class Profile {

    private Float experienceInYrs;
    private BigDecimal expectedPrice;
    private String  resumeContent;

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
