package com.aadi.prac.investrack.model;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

/**
 * Created by aadi on 12/9/17.
 */
@Entity
public class Position extends AbstractAuditable {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String roleName;

    private String description;

    @ManyToMany
    @JoinTable(name = "position_skills",
            joinColumns = @JoinColumn(name="POSITION_ID", referencedColumnName = "ID"),
            inverseJoinColumns = @JoinColumn(name="SKILL_ID",referencedColumnName = "ID")
    )
    private List<Skill> requiredSkills;

    private Float minExperienceInYrsRequired;
    private BigDecimal salaryMax;

    private String location;
    private String client;
    private String project;

    @Enumerated(EnumType.STRING)
    private PositionType hireType;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PositionStatus status = PositionStatus.OPEN;

    @OneToMany(mappedBy = "position")
    private List<InterviewRound> interviewRounds;

    @OneToMany(mappedBy = "appliedPosition")
    private List<Candidate> candidates;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getMinExperienceInYrsRequired() {
        return minExperienceInYrsRequired;
    }

    public void setMinExperienceInYrsRequired(Float minExperienceInYrsRequired) {
        this.minExperienceInYrsRequired = minExperienceInYrsRequired;
    }

    public List<Skill> getRequiredSkills() {
        return requiredSkills;
    }

    public void setRequiredSkills(List<Skill> requiredSkills) {
        this.requiredSkills = requiredSkills;
    }

    public BigDecimal getSalaryMax() {
        return salaryMax;
    }

    public void setSalaryMax(BigDecimal salaryMax) {
        this.salaryMax = salaryMax;
    }

    public PositionStatus getStatus() {
        return status;
    }

    public void setStatus(PositionStatus status) {
        this.status = status;
    }

    public List<InterviewRound> getInterviewRounds() {
        return interviewRounds;
    }

    public void setInterviewRounds(List<InterviewRound> interviewRounds) {
        this.interviewRounds = interviewRounds;
    }

    public List<Candidate> getCandidates() {
        return candidates;
    }

    public void setCandidates(List<Candidate> candidates) {
        this.candidates = candidates;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public String getProject() {
        return project;
    }

    public void setProject(String project) {
        this.project = project;
    }

    public PositionType getHireType() {
        return hireType;
    }

    public void setHireType(PositionType hireType) {
        this.hireType = hireType;
    }
}
