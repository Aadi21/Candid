package com.aadi.prac.investrack.repository;

import com.aadi.prac.investrack.model.Position;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by aadi on 12/9/17.
 */
public interface PositionRepository
        extends CrudRepository<Position, Long>, QuerydslPredicateExecutor<Position> {

}
