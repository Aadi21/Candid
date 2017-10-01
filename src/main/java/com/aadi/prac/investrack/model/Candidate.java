package com.aadi.prac.investrack.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;
import java.util.List;

/**
 * Created by aadi on 12/9/17.
 */
@Entity
public class Candidate extends AbstractAuditable {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String email;
    private String contactNo;
    @Embedded private Address address;
    @Embedded private Profile profile;

    @ManyToMany
    @JoinTable(
            name = "candidate_skills",
            joinColumns = @JoinColumn(name="CANDIDATE_ID", referencedColumnName = "ID"),
            inverseJoinColumns = @JoinColumn(name="SKILL_ID", referencedColumnName = "ID")
    )
    private List<Skill> skills;

    public List<Skill> getSkills() {
        return skills;
    }

    public void setSkills(List<Skill> skills) {
        this.skills = skills;
    }


    @ManyToOne
    @JoinColumn(name = "APPLIED_POSITION_ID")
    private Position appliedPosition;

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public Position getAppliedPosition() {
        return appliedPosition;
    }

    public void setAppliedPosition(Position appliedPosition) {
        this.appliedPosition = appliedPosition;
    }


}
