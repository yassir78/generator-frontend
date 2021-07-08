import {Pojo} from "./pojo";
import {Type} from "./type";

export class Field {
    public name: string;
    public type: Type;
    public simple: boolean;
    public list: boolean;
    public generic: boolean;
    private id: boolean;
    private reference: boolean;
    //public pojo: Pojo;
    public mappedBy: string;
    private comboBox: boolean;


}
