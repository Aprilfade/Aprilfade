package com.wms.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@Data
@EqualsAndHashCode(callSuper = false)
@TableName("menu")
@Schema(description = "Menu对象")
public class Menu implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer id;

    @Schema(description = "菜单编码")
    private String menuCode;

    @Schema(description = "菜单名字")
    private String menuName;

    @Schema(description = "菜单级别")
    private String menuLevel;

    @Schema(description = "菜单父级编码")
    private String menuParentCode;

    @Schema(description = "点击触发的函数")
    private String menuClick;

    @Schema(description = "权限 0超级管理员，1管理员，2普通用户")
    private String menuRight;

    private String menuComponent;

    private String menuIcon;
}