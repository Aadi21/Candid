package com.aadi.prac.investrack.repository;

import com.aadi.prac.investrack.model.Interview;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by aadi on 12/9/17.
 */
public interface InterviewRepository
        extends CrudRepository<Interview, Long>, QuerydslPredicateExecutor<Interview> {
}
