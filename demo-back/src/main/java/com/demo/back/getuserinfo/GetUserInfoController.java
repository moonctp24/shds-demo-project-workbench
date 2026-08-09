package com.demo.back.getuserinfo;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3001")
public class GetUserInfoController {

    @GetMapping("/api/user-info")
    public UserInfoResponse getUserInfo() {
        return new UserInfoResponse("james", 26, "01011112222");
    }
}
