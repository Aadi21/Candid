package com.aadi.prac.investrack.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by aadi on 13/9/17.
 */
@Controller
public class HomeController {

    @RequestMapping(value = "/")
    public String index(){
        return "index";
    }
}
