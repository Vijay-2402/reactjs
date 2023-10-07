package com.vijay;
import com.vijay.Repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin
@RestController
public class Controller {
	@Autowired
	Repository repository;
	@GetMapping("/")
	public List<Quetions> getQuetions(){
	   List <Quetions>allQuetions = repository.findAll();
	   return allQuetions;
	}
}
