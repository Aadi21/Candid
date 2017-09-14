package com.aadi.prac.investrack.model;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

/**
 * Created by aadi on 12/9/17.
 */
@Entity
public class Interview extends AbstractAuditable{
    @Id
    @GeneratedValue
    private Long id;
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InterviewStatus status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InterviewMode mode;

    @Embedded
    private InterviewFeedback feedback;

    @ManyToOne
    @JoinColumn(name = "INTERVIEW_ROUND_ID")
    private InterviewRound interviewRound;

    @ManyToMany
    @JoinTable(name = "interview_taken",
            joinColumns = @JoinColumn(name="INTERVIEW_ID", referencedColumnName = "ID"),
            inverseJoinColumns = @JoinColumn(name="INTERVIEWER_ID",referencedColumnName = "ID")
    )
    private List<Interviewer> interviewers;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public InterviewStatus getStatus() {
        return status;
    }

    public void setStatus(InterviewStatus status) {
        this.status = status;
    }

    public InterviewMode getMode() {
        return mode;
    }

    public void setMode(InterviewMode mode) {
        this.mode = mode;
    }

    public InterviewFeedback getFeedback() {
        return feedback;
    }

    public void setFeedback(InterviewFeedback feedback) {
        this.feedback = feedback;
    }

    public InterviewRound getInterviewRound() {
        return interviewRound;
    }

    public void setInterviewRound(InterviewRound interviewRound) {
        this.interviewRound = interviewRound;
    }

    public List<Interviewer> getInterviewers() {
        return interviewers;
    }

    public void setInterviewers(List<Interviewer> interviewers) {
        this.interviewers = interviewers;
    }
}
