export default function tablesToSql(tables){
    return tables.map(tableToSql).join("\n");
}
//{title:"test",attributes:[{title:"id",type:"INT"}],x:20,y:20}
function tableToSql(table){
    return `CREATE TABLE ${table.title} (${table.attributes.map(attributeToSql).join(", ")});`
}

function attributeToSql(attribute){
    return `${attribute.title} ${attribute.type}(MAX)`
}