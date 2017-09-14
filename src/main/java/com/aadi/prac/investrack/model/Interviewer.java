package com.aadi.prac.investrack.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Created by aadi on 12/9/17.
 */
@Entity
public class Interviewer extends AbstractAuditable {
    @Id
    @GeneratedValue
    private Long id;
    @Column(nullable = false)
    @NotNull
    private String name;
    private String role;
    private Float experienceInYrs;
    private String email;

    @ManyToMany(mappedBy = "interviewers")
    private List<Interview> interviewsTaken;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Float getExperienceInYrs() {
        return experienceInYrs;
    }

    public void setExperienceInYrs(Float experienceInYrs) {
        this.experienceInYrs = experienceInYrs;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Interview> getInterviewsTaken() {
        return interviewsTaken;
    }

    public void setInterviewsTaken(List<Interview> interviewsTaken) {
        this.interviewsTaken = interviewsTaken;
    }
}
