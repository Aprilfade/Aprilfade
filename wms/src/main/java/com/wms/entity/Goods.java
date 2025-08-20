package com.wms.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "Goods对象")
public class Goods implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "主键")
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @Schema(description = "货名")
    private String name;

    @Schema(description = "仓库")
    private Integer storage;

    @Schema(description = "分类")
    @TableField("goodsType")
    private Integer goodstype;

    @Schema(description = "数量")
    private Integer count;

    @Schema(description = "备注")
    private String remark;
}