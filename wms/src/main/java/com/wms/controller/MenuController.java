package com.wms.controller;

import com.wms.common.Result;
import com.wms.entity.Menu;
import com.wms.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/menu")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @GetMapping("/list")
    public Result list(@RequestParam String roleId){
        // 修改了这里的方法引用，将 getMenuright 改为 getMenuRight
        List list = menuService.lambdaQuery().like(Menu::getMenuRight, roleId).list();
        return Result.suc(list);
    }
}