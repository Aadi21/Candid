package com.aadi.prac.investrack.repository;

import com.aadi.prac.investrack.model.InterviewRound;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by aadi on 12/9/17.
 */
public interface InterviewRoundRepository
                    extends CrudRepository<InterviewRound, Long>, QuerydslPredicateExecutor<InterviewRound> {
}
