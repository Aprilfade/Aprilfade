package com.wms.common;

import java.util.HashMap;


public class QueryPageParam {
    private int pageSize = 20;  // 移除 static
    private int pageNum = 1;    // 移除 static
    private HashMap<String, Object> param = new HashMap<>();

    // 注意：getter/setter 也要移除 static
    public int getPageSize() { return pageSize; }
    public void setPageSize(int pageSize) { this.pageSize = pageSize; }
    public int getPageNum() { return pageNum; }
    public void setPageNum(int pageNum) { this.pageNum = pageNum; }

    public HashMap getParam() {
        return param;
    }

    public void setParam(HashMap param) {
        this.param = param;
    }

    public QueryPageParam(int pageSize, int pageNum, HashMap param) {
        this.pageSize = pageSize;
        this.pageNum = pageNum;
        this.param = param;
    }

    public QueryPageParam() {
    }

    @Override
    public String toString() {
        return "QueryPageParam{" +
                "pageSize=" + pageSize +
                ", pageNum=" + pageNum +
                ", param=" + param +
                '}';
    }
}

