import { Schema, model, models } from "mongoose";


const BudgetSchema= new Schema (
    {
      name:{
        type:String,
         required:true,
         trim:true
      },
      amount:{
        type:Number,
        required:true
      },
      createdBy:{
        type:String,
        required:true,
        trim:true
      }
    },{
        timestamps:true
    },
)

export const Budget = models.Budget || model("Budget", BudgetSchema);