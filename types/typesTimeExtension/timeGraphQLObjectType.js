const graphql=require('graphql');

const {
    GraphQLObjectType, GraphQLBoolean, GraphQLString
}=graphql;

const {
    From_DateMustBeSmallerThanTo_Date
}=require('../../validators/time.validator');

const timeObjectFields={
    'from_date':{
        type:GraphQLString,
        description:'From',
        extensions:{
            validations:{
                'CREATE':
                [
                    From_DateMustBeSmallerThanTo_Date
                ],
                'UPDATE':
                [
                    From_DateMustBeSmallerThanTo_Date
                ]
            },
            readOnly:false
        }
    },
    'to_date':{
        type:GraphQLString,
        description:'To',
        extensions:{
            validations:{
                'CREATE':
                [
                    From_DateMustBeSmallerThanTo_Date
                ],
                'UPDATE':
                [
                    From_DateMustBeSmallerThanTo_Date
                ]
            },
            readOnly:false
        }
    }
}

module.exports={
    timeObjectFields
}