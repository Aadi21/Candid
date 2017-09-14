package com.aadi.prac.investrack.repository;

import com.aadi.prac.investrack.model.Candidate;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by aadi on 12/9/17.
 */
public interface CandidateRepository
        extends CrudRepository<Candidate, Long>, QuerydslPredicateExecutor<Candidate> {
}
