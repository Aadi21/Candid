package com.aadi.prac.investrack.repository;

import com.aadi.prac.investrack.model.Skill;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by aadi on 30/9/17.
 */
public interface SkillsRepository
        extends CrudRepository<Skill, Long>, QuerydslPredicateExecutor<Skill> {
}
