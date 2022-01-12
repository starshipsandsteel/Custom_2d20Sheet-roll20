on("chat:message", function(msg) {
    // !init characterID
    var cmdName="!init";
    var msgTxt=msg.content;
    var cmd=msgTxt.split(" ");
    if(msg.type !== "api") return;
    if(cmd[0]!==cmdName) return;
    
    try{
        var PlayerID=cmd[1];
        var PC_name=getAttrByName(PlayerID, 'character_name');
    
        //var INIT = findObjs({type:'attribute',characterid: PlayerID,name: 'init'})[0];
        //sendChat("System",PlayerID+" "+PC_name);
        
        if (getAttrByName(PlayerID, 'init') === undefined){
            sendChat("System:", "Initalizing "+PC_name+"... ");
            createObj("attribute", {name: "init",current: 1,characterid: PlayerID});
            createObj("attribute", {name: "maxresolve",current: 0,characterid: PlayerID});
            createObj("attribute", {name: "maxvigor",current: 0,characterid: PlayerID});
            createObj("attribute", {name: "vigor_current",current: 0,characterid: PlayerID});
            createObj("attribute", {name: "resolve_current",current: 0,characterid: PlayerID});
            createObj("attribute", {name: "spentmom",current: 0,characterid: PlayerID});
            createObj("attribute", {name: "doom",current: 0,characterid: PlayerID});
            createObj("attribute", {name: "momentum",current: 0,characterid: PlayerID});
            createObj("attribute", {name: "difficulty",current: 1,characterid: PlayerID});
            createObj("attribute", {name: "ignorewounds",current: 0,characterid: PlayerID});
            createObj("attribute", {name: "ignoretrauma",current: 0,characterid: PlayerID});
            createObj("attribute", {name: "currentharm",current: 0,characterid: PlayerID});
            createObj("attribute", {name: "d20momentum",current: 0,characterid: PlayerID});
            createObj("attribute", {name: "d20doom",current: 0,characterid: PlayerID});
            createObj("attribute", {name: "d20fortune",current: 0,characterid: PlayerID});
            createObj("attribute", {name: "d20exception",current: 0,characterid: PlayerID});
            createObj("attribute", {name: "currentskillname",current: 0,characterid: PlayerID});
            createObj("attribute", {name: "currentattributename",current: 0,characterid: PlayerID});
            createObj("attribute", {name: "currentTN",current: 0,characterid: PlayerID});
            createObj("attribute", {name: "currentFC",current: 0,characterid: PlayerID});
            createObj("attribute", {name: "currenttype",current: 0,characterid: PlayerID});
            createObj("attribute", {name: "fortune",current: 0,characterid: PlayerID});
            createObj("attribute", {name: "gold",current: 0,characterid: PlayerID});
            createObj("attribute", {name: "minion1",current: 0,characterid: PlayerID});
            createObj("attribute", {name: "minion2",current: 0,characterid: PlayerID});
            createObj("attribute", {name: "minion3",current: 0,characterid: PlayerID});
            createObj("attribute", {name: "minion4",current: 0,characterid: PlayerID});      
            createObj("attribute", {name: "miniondice",current: 0,characterid: PlayerID});   
            createObj("attribute", {name: "loadbonus",current: 0,characterid: PlayerID}); 
            createObj("attribute", {name: "*-----------*",current: 0,characterid: PlayerID});
        } else {  
            sendChat("System:", PC_name+" is already initalized.");
        }
    }
    catch(err){
        
    }
});

on("chat:message", function(msg) {
    // !playerid
    var cmdName="!playerid";
    var msgTxt=msg.content;
    var cmd=msgTxt.split(" ");
    var playerid=msg.playerid;
    if(msg.type !== "api") return;
    if(cmd[0]!==cmdName) return;
    sendChat(msg.who,msg.playerid);
});

on("chat:message", function(msg) {
    //!savemomentum PLAYERID GM
    var cmdName="!savemomentum";
    var msgTxt=msg.content;
    var cmd=msgTxt.split(" ");
    if(msg.type !== "api") return;
    if(cmd[0]!==cmdName) return;
    var PlayerID = cmd[1];
    
    try{
        var GM = findObjs({ type: 'character', name: cmd[2] })[0];

        var PC_name=getAttrByName(PlayerID, 'character_name');
        var gmmomentum = findObjs({ type: 'attribute', characterid: GM.id, name: 'momentum' })[0];
        var playermomentum = findObjs({ type: 'attribute', characterid: PlayerID, name: 'momentum' })[0];
        var GMmom = parseInt(gmmomentum.get('current'));
        var PCmom = parseInt(playermomentum.get('current'));
    
        var newmomentum=GMmom+PCmom;
        if (newmomentum>6){
            newmomentum=6;
            sendChat(msg.who, "Momentum pool is maxed at 6!");
        }
        gmmomentum.set('current',newmomentum);
        playermomentum.set('current',0);
        sendChat(msg.who, PC_name+" transfers "+ PCmom + " momentum to the party");
    }
    catch(err){
        sendChat(msg.who,"!init "+PlayerID);                 
    }
});

on("chat:message", function(msg) {
    //!keepmomentum character amount
    var cmdName="!keepmomentum";
    var msgTxt=msg.content;
    var cmd=msgTxt.split(" ");
    if(msg.type !== "api") return;
    if(cmd[0]!==cmdName) return;
    var PlayerID = cmd[1];
    
    try{

        var PC_name=getAttrByName(PlayerID, 'character_name');
        var playermomentum = findObjs({ type: 'attribute', characterid: PlayerID, name: 'momentum' })[0];
        var amount = parseInt(cmd[2]);
        var PCmom = parseInt(playermomentum.get('current'))+amount;
        playermomentum.set('current',PCmom);
        sendChat(msg.who, PC_name+" keeps "+ amount + " momentum.");
    }
    catch(err){
        sendChat(msg.who,"!init "+PlayerID);          
    }
});

on("chat:message", function(msg) {
    //!tossmomentum character amount
    var cmdName="!tossmomentum";
    var msgTxt=msg.content;
    var cmd=msgTxt.split(" ");
    if(msg.type !== "api") return;
    if(cmd[0]!==cmdName) return;
    var PlayerID = cmd[1];
    
    try{

        var PC_name=getAttrByName(PlayerID, 'character_name');
        var playermomentum = findObjs({ type: 'attribute', characterid: PlayerID, name: 'momentum' })[0];
        var amount = parseInt(cmd[2]);
        var PCmom = parseInt(playermomentum.get('current'))-amount;
        if (PCmom<0) PCmom=0;
        playermomentum.set('current',PCmom);
        sendChat(msg.who, PC_name+" tosses "+ amount + " momentum.");
    }
    catch(err){
        sendChat(msg.who,"!init "+PlayerID);          
    }
});



on("chat:message", function(msg) {
    //!savedoom PLAYER GM
     var cmdName="!savedoom";
    var msgTxt=msg.content;
    var cmd=msgTxt.split(" ");
    if(msg.type !== "api") return;
    if(cmd[0]!==cmdName) return;
    
    var PlayerID = cmd[1];
    
    try{
        var GM = findObjs({ type: 'character', name: cmd[2] })[0];

        var PC_name=getAttrByName(PlayerID, 'character_name');
        var gmdoom = findObjs({ type: 'attribute', characterid: GM.id, name: 'doom' })[0];
        var playermomentum = findObjs({ type: 'attribute', characterid: PlayerID, name: 'momentum' })[0];
        var GMdoom = parseInt(gmdoom.get('current'));
        var PCmom = parseInt(playermomentum.get('current'));
        var newdoom=GMdoom+PCmom;
        gmdoom.set('current',newdoom);
        playermomentum.set('current',0);
        var doommsg="&{template:doompool}{{header=DOOM}}{{doom="+newdoom+"}}";
        sendChat(msg.who, doommsg);
        //sendChat(msg.who, cmd[1]+" transfers "+ PCmom + " doom to the doom pile!, DOOM now sits at "+newdoom+"!");
    }
    catch(err){
        sendChat(msg.who,"!init "+PlayerID);          
    }
});

on("chat:message", function(msg) {
    //!spendmomentum CHARNAME VALUE SPENDNAME
    var cmdName="!spendmomentum";
    var msgTxt=msg.content;
    var cmd=msgTxt.split(" ");
    if(msg.type !== "api") return;
    if(cmd[0]!==cmdName) return;
    
    var PlayerID = cmd[1];
    
    try{
        var spenddesc="";
        for (i=3;i<cmd.length;i++){
            spenddesc=spenddesc+cmd[i]+" ";
        }

        var PC_name=getAttrByName(PlayerID, 'character_name');
        var playermomentum = findObjs({ type: 'attribute', characterid: PlayerID, name: 'momentum' })[0]
        var mom=playermomentum.get('current');
        var result="";
        var spending=parseInt(cmd[2]);
        if (mom-spending<0){
            result="Not enough momentum left!"
        } else{
            result="&{template:momentumspend}{{name="+PC_name+"}}{{spend_name="+spenddesc+"}}{{spend_cost="+spending+"}}"
            mom=mom-spending;
        }
        playermomentum.set('current',mom);
        sendChat(msg.who, result);
    }
    catch(err){
        sendChat(msg.who,"!init "+PlayerID);      
    }
});

on("chat:message", function(msg) {
  //!quickspend CHARNAME SPENDTYPE COST
  
    var cmdName="!quickspend";
    var msgTxt=msg.content;
    var cmd=msgTxt.split(" ");
    if(msg.type !== "api") return;
    if(cmd[0]!==cmdName) return;
    var PlayerID = cmd[1];
    try{

        var PC_name=getAttrByName(PlayerID, 'character_name');
        var playermomentum = findObjs({ type: 'attribute', characterid: PlayerID, name: 'momentum' })[0]
        var mom=playermomentum.get('current');
        var result="";
        var type=cmd[2];
        var cost=parseInt(cmd[3]);
        if (cost>0){
            switch (type){
                case "halfdmg":
                    var dmg=parseInt(cost/2);
                    cost=2;
                    if(mom-cost>=0){
                        type="Half damage "+dmg;
                        result="&{template:momentumspend}{{name="+PC_name+"}}{{spend_name="+type+"}}{{spend_cost="+cost+"}}";
                    }
                break;
                case "called":
                    cost=2;
                    if(mom-cost>=0){
                        type="Called Shot!"
                        result="&{template:momentumspend}{{name="+PC_name+"}}{{spend_name="+type+"}}{{spend_cost="+cost+"}}";
                    }
                break;
                case "withdraw":
                    if(mom-cost>=0){
                        type="Withdraw";
                        result="&{template:momentumspend}{{name="+PC_name+"}}{{spend_name="+type+"}}{{spend_cost="+cost+"}}";
                    }
                break;
                case "courage":
                    if(mom-cost>=0){
                        type="Gain courage";
                        result="&{template:momentumspend}{{name="+PC_name+"}}{{spend_name="+type+" [["+cost+"t[CD]]]}}{{spend_cost="+cost+"}}";
                    }
                break;
                case "piercing":
                    if(mom-cost>=0){
                        var pier=cost*2;
                        type="Penetration "+pier;
                        result="&{template:momentumspend}{{name="+PC_name+"}}{{spend_name="+type+"}}{{spend_cost="+cost+"}}";
                    }
                break;
                case "disarm":
                    if (cost>2) {cost=2}
                    if (mom-cost>=0){
                        if (cost==1) {
                            type="Disarm 1-handed";
                        } else {
                            type="Disarm 2-handed";
                        }
                        result="&{template:momentumspend}{{name="+PC_name+"}}{{spend_name="+type+"}}{{spend_cost="+cost+"}}";
                    }
                break;
                case "swift":
                    if (mom-cost>=0){
                        type="Swift Action";
                        var difficulty = findObjs({ type: 'attribute', characterid: PlayerID, name: 'difficulty' })[0]
                        var diff=difficulty.get('current')
                        diff=diff+1;
                        difficulty.set('current',diff);
                        result="&{template:momentumspend}{{name="+PC_name+"}}{{spend_name="+type+"}}{{spend_cost="+cost+"}}";
                    }
                break;
                case "extradamage":
                    if (mom-cost>=0){
                        type="Extra Damage";
                        result="&{template:CDroll}{{name="+PC_name+"}}{{effects=Momentum Damage}}{{result="+cost+"}}";
                    }
                break;
                case "rerolldamage":
                    if (mom-cost>=0){
                        type="Reroll Damage";
                        result="&{template:CDroll}{{name="+PC_name+"}}{{effects=Last weapon effects}}{{result=[["+cost+"t[CD]]]}}";
                    }
                break;
                case "recovervigor":
                    if (mom-cost>=0){
                        var currentvigor = findObjs({ type: 'attribute', characterid: PlayerID, name: 'vigor_current' })[0];
                        var maxvigor = findObjs({ type: 'attribute', characterid: PlayerID, name: 'maxvigor' })[0];
                        
                        var mv=parseInt(maxvigor.get('current'));
                        var cv=parseInt(currentvigor.get('current'));
                        var diff=mv-cv;
                        if (cost<diff){
                            currentvigor.set('current',cv+cost);
                        } else {
                            currentvigor.set('current',mv);
                            cost=diff;
                        }
                        type="Recover Vigor";
                        result="&{template:momentumspend}{{name="+PC_name+"}}{{spend_name="+type+"}}{{spend_cost="+cost+"}}";
                    }
                break;
                case "recoverresolve":
                    if (mom-cost>=0){
                        var currentresolve = findObjs({ type: 'attribute', characterid: PlayerID, name: 'resolve_current' })[0];
                        var maxresolve = findObjs({ type: 'attribute', characterid: PlayerID, name: 'maxresolve' })[0];
                        var mr = parseInt(getAttrByName(PlayerID, 'maxresolve'));
                        var cr = parseInt(getAttrByName(PlayerID, 'resolve_current'));
                        
                        //var mr=parseInt(maxresolve.get('current'));
                        //var cr=parseInt(currentresolve.get('current'));
                        var diff=mr-cr;
                        if (cost<diff){
                            currentresolve.set('current',cr+cost);
                        } else {
                            currentresolve.set('current',mr);
                            cost=diff;
                        }
                        type="Recover Resolve";
                        result="&{template:momentumspend}{{name="+PC_name+"}}{{spend_name="+type+"}}{{spend_cost="+cost+"}}";
                    }
                break;
            }
        }
        if (mom-cost<0){
            result="Not enough momentum left!"
        } else {
            mom=mom-cost;
        }
        playermomentum.set('current',mom);
        sendChat(msg.who, result);
    }
    catch(err){
        sendChat(msg.who,"!init "+PlayerID);            
    }
});

on("chat:message", function(msg) {
  //!spendgold CHARID AMOUNT DESC
  
    var cmdName="!spendgold";
    var msgTxt=msg.content;
    var cmd=msgTxt.split(" ");
    if(msg.type !== "api") return;
    if(cmd[0]!==cmdName) return;
    var PlayerID = cmd[1];
    try{

        var PC_name=getAttrByName(PlayerID, 'character_name');
        var PC_current_gold = findObjs({ type: 'attribute', characterid: PlayerID, name: 'gold' })[0]
        var gold = parseInt(PC_current_gold.get('current'));
        var spend=parseInt(cmd[2]);
        var desc=cmd[3];
        if (desc==null) {
            desc="Misc.";
        }
        if (gold-spend<0){
            desc="Not Enough Gold."
            spend=0;
        } else {
            gold-=spend;
        }
        var out="&{template:goldspent}{{name="+PC_name+"}}{{spend_name="+desc+"}}{{spend_cost="+spend+"}}";
        PC_current_gold.set('current',gold);
        sendChat(msg.who, out);
    }
    catch(err){
        sendChat(msg.who,"!init "+PlayerID);            
    }
});

on("chat:message", function(msg) {
    //!rollcd character weaponname basedice bonusdice extra loadbonus effects effect effect
    //      0      1         2        3       4          5      6        7    
    var cmdName="!rollcd";
    var msgTxt=msg.content;
    var cmd=msgTxt.split("=");
    if(msg.type !== "api") return;
    if(cmd[0]!==cmdName) return;
    var PlayerID = cmd[1];
    try{

        var loadbonus_attr = findObjs({ type: 'attribute', characterid: PlayerID, name: 'loadbonus' })[0];
        var BaseDice=parseInt(cmd[3]);
        var weaname=(cmd[2]);
        var BonusDice=parseInt(cmd[4]);
        var ExtraDice=parseInt(cmd[5]);
        var LoadBonus=parseInt(cmd[6]);
        var eff="";
        var lencmd=cmd.length; 
        if (lencmd>7){ 
            var t;
            for (t=7;t<lencmd;t++){
                eff=eff+cmd[t]+" ";
            }
        } else{
            eff=cmd[7];
        }
        if (LoadBonus>0){
            var loads="{{loads="+LoadBonus.toString()+"}}";
        } else {
            var loads="";
        }
        var totalCD=BaseDice+BonusDice+LoadBonus+ExtraDice;
        var PC_name=getAttrByName(PlayerID, 'character_name');
        loadbonus_attr.set('current',0);
        var dmgreroll="[Re-roll Damage](!&#13;&#47;r ?{Re-roll}t[CD])"
        
        sendChat(msg.who, "&{template:CDroll}{{name="+PC_name+"}}{{weapon="+weaname+"}}{{button="+dmgreroll+"}}{{totaldice="+totalCD+"}}{{extradice="+ExtraDice+"}}{{basedice="+BaseDice+"}}{{bonusdice="+BonusDice+"}}{{loadbonus="+LoadBonus+"}}{{effects="+eff+"}}"+loads+"{{result=[["+totalCD.toString()+"t[CD]]]}}{{location=[[1t[HITLOC]]]}}");
    }
    catch(err){
        sendChat(msg.who,"!init "+PlayerID);
    }
});

on("chat:message", function(msg) {
    //!clearloads characterid
    var cmdName="!clearloads";
    var msgTxt=msg.content;
    var cmd=msgTxt.split(" ");
    if(msg.type !== "api") return;
    if(cmd[0]!==cmdName) return;
    var PlayerID = cmd[1];
    
    try{

        var PC_name=getAttrByName(PlayerID, 'character_name');
        var loadbonus_attr = findObjs({ type: 'attribute', characterid: PlayerID, name: 'loadbonus' })[0];
        var d20e_attr = findObjs({ type: 'attribute', characterid: PlayerID, name: 'd20exception' })[0];
        var loadbonus=parseInt(loadbonus_attr.get('current'));
        var exceptiondice=parseInt(d20e_attr.get('current'));
        if (loadbonus>0){
            var msgout=PC_name + " unloads "+loadbonus.toString()+" loads.  Please redistribute to your weapons.";
            exceptiondice=exceptiondice-loadbonus;
            if (exceptiondice<0){
                exceptiondice=0;
            }
            d20e_attr.set('current',exceptiondice);
        } else {
            var msgout=PC_name + " has nothing to unload.";
        }
        
        loadbonus_attr.set('current',0);
        sendChat(msg.who, msgout);
    }
    catch(err){
        sendChat(msg.who,"!init "+PlayerID);
    }
});

on("chat:message", function(msg) {
    //!transfermomentum character GM
    var cmdName="!buyfortune";
    var msgTxt=msg.content;
    var cmd=msgTxt.split(" ");
    if(msg.type !== "api") return;
    if(cmd[0]!==cmdName) return;
    
    var PlayerID = cmd[1];
    
    try{
        var PC_name=getAttrByName(PlayerID, 'character_name');
        var playermomentum = findObjs({ type: 'attribute', characterid: PlayerID, name: 'momentum' })[0];
        var playerfortune = findObjs({type:'attribute', characterid:PlayerID, name: 'fortune'})[0];
        var npcwounds = findObjs({type:'attribute', characterid:PlayerID, name: 'npcwounds'})[0];
        
        var PlayerMom = parseInt(playermomentum.get('current'));
        var PlayerFor = parseInt(playerfortune.get('current'));
        var NPCClass = parseInt(npcwounds.get('current'));
        
        if (NPCClass!=5){
            sendChat(msg.who, PC_name+" is not a Nemesis.");
        } else { 
            if (PlayerMom-3>0){
                PlayerMom=PlayerMom-3
                PlayerFor=PlayerFor+1
                playermomentum.set('current',PlayerMom);
                playerfortune.set('current',PlayerFor);
            } else {
                sendChat(msg.who, PC_name+" does not have enough doom");   
            }
        }
    }
    catch(err){
        sendChat(msg.who, err.message);
         sendChat(msg.who,"!init "+PlayerID);           
    }
});

on("chat:message", function(msg) {
    //!transfermomentum character GM
    var cmdName="!transfermomentum";
    var msgTxt=msg.content;
    var cmd=msgTxt.split(" ");
    if(msg.type !== "api") return;
    if(cmd[0]!==cmdName) return;
    
    var PlayerID = cmd[1];
    
    try{
        var GM = findObjs({ type: 'character', name: cmd[2] })[0];

        var PC_name=getAttrByName(PlayerID, 'character_name');
        var gmmomentum = findObjs({ type: 'attribute', characterid: GM.id, name: 'momentum' })[0];
        var playermomentum = findObjs({ type: 'attribute', characterid: PlayerID, name: 'momentum' })[0];
        var GMmom = parseInt(gmmomentum.get('current'));
        var PCmom = parseInt(playermomentum.get('current'));
        var newmomentum=GMmom+PCmom;
        gmmomentum.set('current',0);
        playermomentum.set('current',newmomentum);
        sendChat(msg.who, PC_name+" transfers "+ GMmom + " momentum from the party");
    }
    catch(err){
         sendChat(msg.who,"!init "+PlayerID);           
    }
});

on("chat:message", function(msg) {
    //!decreasemomentum GM amount
    var cmdName="!decreasemomentum";
    var msgTxt=msg.content;
    var cmd=msgTxt.split(" ");
    if(msg.type !== "api") return;
    if(cmd[0]!==cmdName) return;
    
    try{
        
        var GM = findObjs({ type: 'character', name: cmd[1] })[0];
        var val = cmd[2];
        if (GM!== undefined){
            var gmmomentum = findObjs({ type: 'attribute', characterid: GM.id, name: 'momentum' })[0];
            var GMmom = parseInt(gmmomentum.get('current'));
            var amount = parseInt(val);
             var newmomentum=GMmom-amount;
            if (newmomentum<0){
                newmomentum=0;
            }
            gmmomentum.set('current',newmomentum);
            sendChat(msg.who, "Momentum is decreased by "+val+" and now sits at "+newmomentum);
        } else{
            sendChat(msg.who, "Couldn't find "+cmd[1]);
        }
    }
    catch(err){
        
    }
});

on("chat:message", function(msg) {
    //!addmom GM amount
    var cmdName="!addmom";
    var msgTxt=msg.content;
    var cmd=msgTxt.split(" ");
    if(msg.type !== "api") return;
    if(cmd[0]!==cmdName) return;

    try{
        var GM = findObjs({ type: 'character', name: cmd[1] })[0];
        var val = cmd[2];
        if (GM!== undefined){
            var gmmomentum = findObjs({ type: 'attribute', characterid: GM.id, name: 'momentum' })[0];
            var GMmom = parseInt(gmmomentum.get('current'));
            var amount = parseInt(val);
            var newmomentum=GMmom+amount;
            if (newmomentum<0){
                newmomentum=0;
            }
            gmmomentum.set('current',newmomentum);
            sendChat(msg.who, "Momentum is increased by "+val+" and now sits at "+newmomentum);
        }
        else{
            sendChat(msg.who, "Couldn't find "+cmd[1]);
        }
    }
    catch(err){
        
    }
});

on("chat:message", function(msg) {
    //!transferdoom character GM
    
    var cmdName="!transferdoom";
    var msgTxt=msg.content;
    var cmd=msgTxt.split(" ");
    if(msg.type !== "api") return;
    if(cmd[0]!==cmdName) return;
    var PlayerID = cmd[1];
    try{
        var PC_name=getAttrByName(PlayerID, 'character_name');
        
        var GM = findObjs({ type: 'character', name: cmd[2] })[0];
        var gmdoom = findObjs({ type: 'attribute', characterid: GM.id, name: 'doom' })[0];
        var playermomentum = findObjs({ type: 'attribute', characterid: PlayerID, name: 'momentum' })[0];
        
        var GMdoom = parseInt(gmdoom.get('current'));
        var PCmom = parseInt(playermomentum.get('current'));
    
        var newmomentum=GMdoom+PCmom;
    
        gmdoom.set('current',0);
        playermomentum.set('current',newmomentum);
        
        //var doommsg="&{template:doompool}{{header=DOOM}}{{doom="+GMdoom+"}}";
        //sendChat(msg.who, doommsg);
        
        //sendChat(msg.who, PC_name+" gets "+ GMdoom + " DOOM from the pool!");
    }
    catch(err){
        sendChat(msg.who,"!init "+PlayerID);      
    }
});

on("chat:message", function(msg) {
    //!skillrow characterID base TN FC skillName diff mTN mFC
    //Defaults to 2d20
    var cmdName="!skillrow";
    var msgTxt=msg.content;
    var cmd=msgTxt.split(" ");
    
    if(msg.type !== "api") return;
    if(cmd[0]!==cmdName) return;
    if(cmd[1]==="help"){
        sendChat(msg.who,"!skillrow characterID Base TN FC skillName diff");
        return;
    }
    var PlayerID = cmd[1]; 
    try{

    // Base stats non-optional    

        var PC_name=getAttrByName(PlayerID, 'character_name');
        var base=parseInt(cmd[2]);
        var TN=parseInt(cmd[3]);
        var FC=parseInt(cmd[4]);
        var skillname=cmd[5];
        var diff=parseInt(cmd[6]);
        var mTN=parseInt(cmd[7]);
        var mFC=parseInt(cmd[8]);
        var DoomSave=0;
    //Get Sheettab to determine where this was rolled from.    
        var sheettabobj=findObjs({type:'attribute', characterid:PlayerID, name:'sheetTab'})[0];    
        var tab=sheettabobj.get('current');
        
    //GET GM INFORMATION
        var GMpanel = findObjs({ type: 'character', name: "GMPANEL" })[0];
        var GMdoom = findObjs({ type: 'attribute', characterid: GMpanel.id, name: 'doom' })[0];
        //var momentum = findObjs({ type: 'attribute', characterid: GM.id, name: 'momentum' })[0]; // Do I need this?
        var spentmom = findObjs({ type: 'attribute', characterid: PlayerID, name: 'spentmom' })[0]; // Do I need this?
        var playermomentum = findObjs({type:'attribute',characterid:PlayerID,name:'momentum'})[0];
        var GMDM=parseInt(GMdoom.get('current'));
        var PLYMOM=parseInt(playermomentum.get('current'));

        
        //Get minion information
        if (tab=="NPC") {
            
            GMdoom.set('current',PLYMOM+GMDM);
            GMDM=parseInt(GMdoom.get('current'));
            PLYMOM=0
            
            var minioncheckobj=findObjs({type:'attribute', characterid:PlayerID, name:'miniondice'})[0];
            var min1obj=findObjs({type:'attribute', characterid:PlayerID, name:'minion1'})[0];
            var min2obj=findObjs({type:'attribute', characterid:PlayerID, name:'minion2'})[0];
            var min3obj=findObjs({type:'attribute', characterid:PlayerID, name:'minion3'})[0];
            var min4obj=findObjs({type:'attribute', characterid:PlayerID, name:'minion4'})[0];
        
            var minioncheck=parseInt(minioncheckobj.get('current'));
            var min1=parseInt(min1obj.get('current'));
            var min2=parseInt(min2obj.get('current'));
            var min3=parseInt(min3obj.get('current'));
            var min4=parseInt(min4obj.get('current'));
            var miniontotal=min1+min2+min3+min4;
        } else {
            var miniontotal=0;
        }
    
        
        //get difficulty & Harm
      //  var difficulty = findObjs({ type: 'attribute', characterid: PlayerID, name: 'difficulty' })[0];
        var ignorewounds = findObjs({ type: 'attribute', characterid: PlayerID, name: 'ignorewounds' })[0];
        var ignoretrauma = findObjs({ type: 'attribute', characterid: PlayerID, name: 'ignoretrauma' })[0];
        var currentharm = findObjs({ type: 'attribute', characterid: PlayerID, name: 'currentharm' })[0];
       // var diff=parseInt(difficulty.get('current'));
        var total_wounds=getAttrByName(PlayerID, 'totalwounds');
        var total_trauma=getAttrByName(PlayerID, 'totaltrauma');
        var iw=ignorewounds.get('current');
        var it=ignoretrauma.get('current');
    
        //get dice
        var momentumdice = findObjs({ type: 'attribute', characterid: PlayerID, name: 'd20momentum' })[0];
        var doomdice = findObjs({ type: 'attribute', characterid: PlayerID, name: 'd20doom' })[0];
        var fortunedice = findObjs({ type: 'attribute', characterid: PlayerID, name: 'd20fortune' })[0];
        var exceptiondice = findObjs({ type: 'attribute', characterid: PlayerID, name: 'd20exception' })[0];
        var d20m=parseInt(momentumdice.get('current'));
        var d20f=parseInt(fortunedice.get('current'));
        var d20d=parseInt(doomdice.get('current'));
        var d20e=parseInt(exceptiondice.get('current'));
    
    //  ICON
        var actionicon="{{momentumicon=1}}";
    //  HARMS
    
        var mentalskills=["Alchemy","Insight","Animal_Handling","Command","Counsel","Discipline","Healing","Linguistics","Lore","Observation","Persuade","Society","Sorcery","Warfare","Thievery","Survival","Craft","Knowledge","Senses","Social"];
        var physicalskills = ["Acrobatics","Athletics","Melee","Parry","Ranged_Weapons","Resistance","Sailing","Stealth","Combat","Movement","Fortitude"];
    
    // Check CMDs for validity or set defaults
        if (isNaN(base)) {
            base=2;
        }
        if (isNaN(d20m) || d20m==null) {
            d20m=0;
        }
        if (isNaN(d20d)) {
            d20d=0;
        }
        if (isNaN(d20e)) {
            d20e=0;
        }
        if (isNaN(d20f)) {
            d20f=0;
        }
        if (skillname==""){
            skillname="Skill check";
        }
    
        if(base>5){
            sendChat(msg.who,"Base Dice greater than 5, set to 2 for this roll.");
            base=2;
        }
        
    //Determine difficulty
    //Determine skill type
    
    
    // DEBUG REPORT 
    //sendChat(msg.who,"Skill: "+skillname);
    //sendChat(msg.who,"CMD3: "+cmd[3]);
    //sendChat(msg.who,"CMD4: "+cmd[4]);
    //sendChat(msg.who,"CMD5: "+cmd[5]);
    //sendChat(msg.who,"CMD6: "+cmd[6]);
    //sendChat(msg.who,"tab: "+tab);
    //sendChat(msg.who,"TN: "+TN);
    //sendChat(msg.who,"NEWTN: "+TN);
    //sendChat(msg.who,"TW: "+total_wounds);
    //sendChat(msg.who,"TT: "+total_trauma);
    //sendChat(msg.who,"FC: "+FC);
    
    //PARSE Attribute into value, convert "12+3" to 15
        TN=0;
        var TNwork=cmd[3].replace(/\s/g, '').match(/[+\-]?([0-9\.\s]+)/g) || [];
        while (TNwork.length) TN=TN+ parseFloat(TNwork.shift());
        
        if (physicalskills.includes(skillname) && iw!=1){
            var totaldiff=total_wounds+diff;
        } else if (mentalskills.includes(skillname) && it!=1){
            var totaldiff=total_trauma+diff;
            //sendChat(msg.who,"TT: "+total_trauma);
            //sendChat(msg.who,"dif: "+diff);
        } else {
            var totaldiff=diff;
        }
        
        skillname=skillname.replace("_"," ");
        
        var d20roll;
        var mSuccess=0;
        var mDieRollString="";
        
        if ((minioncheck==1) && (tab=="NPC")){
            //base=base+miniontotal;
            sendChat(msg.who,"Minion Check:"+mTN+" & "+mFC);
            for (i=0;i<miniontotal;i++){
                d20roll=Math.floor(Math.random() * 20)+1; 
                if (d20roll<=mTN){
                    mSuccess=mSuccess+1;
                    if(d20roll<=mFC){
                        mSuccess=mSuccess+1;
                        mDieRollString=mDieRollString + "<span style='color:#1CE20C;text-decoration:underline'>"+d20roll.toString() +"</span>, ";
                    } else {
                       mDieRollString=mDieRollString + "<span style='color:#1A8B11'>"+d20roll.toString() +"</span>, "; 
                    }
                } else if (d20roll>=20) {
                    complications=complications+1;
                mDieRollString=mDieRollString + "<span style='color:red'>"+d20roll.toString() +"</span>, ";
                } else if ((d20roll>=19) && (FC<=0)){
                    complications=complications+1;
                mDieRollString=mDieRollString + "<span style='color:red'>"+d20roll.toString() +"</span>, ";
                } else {
                mDieRollString=mDieRollString + "<span style='color:#C4BEBC'>"+d20roll.toString() +"</span>, ";
                }
            }
        }
        //set up and make the roll.
        var d20roll;
        var die_success=0;
        var complications=0;
        var totaldice=base+d20m+d20d+d20e;
        var forsuc=0;
        var dierollstring="";
    
        if(totaldice+d20f>5){
            sendChat(msg.who,"Too many dice.");
        } else {
            if (FC>0){
                forsuc=d20f*2;
            } else if (TN>=0){
                forsuc=d20f;
            }
            for (i=0;i<totaldice;i++){
                d20roll=Math.floor(Math.random() * 20)+1;    
    
                if (d20roll<=TN){
                    die_success=die_success+1;
                    if (d20roll<=FC){
                        die_success=die_success+1
                        dierollstring=dierollstring + "<span style='color:#1CE20C;text-decoration:underline,overline'>"+d20roll.toString() +"</span>, ";
                    } else {
                        dierollstring=dierollstring + "<span style='color:#065400'>"+d20roll.toString() +"</span>, ";
                    }
                } else if (d20roll>=20 || (d20roll>=19) && (FC<=0)){
                    complications=complications+1;
                    dierollstring=dierollstring + "<span style='color:red;background-color:#ffabab'>"+d20roll.toString() +"</span>, ";
                } else {
                dierollstring=dierollstring + "<span style='color:#706f6e'>"+d20roll.toString() +"</span>, ";
                }
            }
            tsuccess=forsuc+die_success;

            
            for (i=0;i<d20f;i++){
                     dierollstring=dierollstring + "<span style='color:#ffffff;background-color:#d6a100'>1, </span>";
            }
            //Add doom spent from the skill roll to the main doom pool
            GMDM=GMDM+d20d;
            GMdoom.set('current',GMDM);
            
            var diestring=dierollstring.slice(0, -9);
            var mdiestring="minions: "+mDieRollString.slice(0,-9);
            mdiestring=mdiestring+"</span>:  "+mSuccess;
            diestring=diestring+"</span> -> ["+tsuccess+"]";
            tsuccess=tsuccess+mSuccess;
            
            if (tsuccess>=totaldiff){
                var succeedfail ="{{SUCCEED=1}}";
                var genmomentum=tsuccess-totaldiff;
            } else {
                var succeedfail ="{{FAIL=1}}";
                var genmomentum=0;
            }
            //Add generated momentum to the player
            PLYMOM=PLYMOM+genmomentum;
            playermomentum.set('current',PLYMOM);
            
            //Reset the dice to zero
            momentumdice.set('current',0);
            fortunedice.set('current',0);
            doomdice.set('current',0);
            spentmom.set('current',0);
            exceptiondice.set('current',0);
            
            
            
            
            var rollname="{{name="+PC_name+"}}";
            var basedice="{{dice="+totaldice+"}}";
            var rollskill="{{skill="+skillname+"}}";
            var rolldiff="{{diff="+totaldiff+"}}";
            var rolld20m="{{momentumdice="+d20m+"}}";
            var rolld20d="{{doomdice="+d20d+"}}";
            var rolld20f="{{fortunedice="+d20f+"}}";
            var rollfortune="{{fortune="+forsuc+"}}";
            var tsuccess="{{tsuccess="+tsuccess+"}}";
            var minionsuccess="{{msuccess="+mSuccess+"}}";
            var dierolls="{{rolls="+diestring+"}}";
            var result="{{result="+die_success+"}}";
            var rollspent="{{spentmomentum="+d20m+"}}";
            var genmom="{{genmom="+genmomentum+"}}";
            var comp="{{complications="+complications+"}}";
            var momchoice="?{How much?|"+genmomentum+"}";
            var minionroll="{{minions="+mdiestring+"}}";
            var button="{{struggle=[Stuggle?](!tossmomentum "+PlayerID+" ?{Adjustment}*-1)}}";
            
            if ((minioncheck==1) && (tab=="NPC")){
                var rollresult="&{template:conanroll}"+succeedfail+actionicon+rollname+basedice+rollskill+rolldiff+tsuccess+rolld20m+rolld20d+rolld20f+rollspent+rollfortune+dierolls+result+genmom+comp+minionroll+minionsuccess+button;
            } else {
                var rollresult="&{template:conanroll}"+succeedfail+actionicon+rollname+basedice+rollskill+rolldiff+tsuccess+rolld20m+rolld20d+rolld20f+rollspent+rollfortune+dierolls+result+genmom+comp+button;
            }   
            sendChat(msg.who, rollresult);
        }
    }
    catch(err){
        sendChat(msg.who,err.message);
        sendChat(msg.who,"!init "+PlayerID);        
    }
});

// ==================================
// CONSOLE COMMANDS
// ==================================

on("chat:message", function(msg) {
    //!reportdoom GM
    
    var cmdName="!reportdoom";
    var msgTxt=msg.content;
    var cmd=msgTxt.split(" ");
    if(msg.type !== "api") return;
    if(cmd[0]!==cmdName) return;
    try {
        var GM = findObjs({ type: 'character', name: cmd[1] })[0];
        var gmdoom = findObjs({ type: 'attribute', characterid: GM.id, name: 'doom' })[0];
        var currentdoom = parseInt(gmdoom.get('current'));
        var doommsg="&{template:doompool}{{header=DOOM}}{{doom="+currentdoom+"}}";
        sendChat(msg.who, doommsg);
    }
    catch(err){
        
    }
});

on("chat:message", function(msg) {
    //!2d20 Dice TN FC Diff
    //Defaults to 2d20
    var cmdName="!2d20";
    var msgTxt=msg.content;
    var cmd=msgTxt.split(" ");
    try{
        if(msg.type !== "api") return;
        if(cmd[0]!==cmdName) return;
        
        if(cmd[1]==="help"){
            sendChat(msg.who,"!2d20 Dice TN FC Diff");
            return;
        }
        
        //Get Player and GM bjects
        //var PlayerID = cmd[1];
        //var PC_name=getAttrByName(PlayerID, 'character_name');
    // Base stats non-optional    
        var PC_name="Skill Roll";
        var skill_name="QR";
        var base=parseInt(cmd[1]);
        var TN=parseInt(cmd[2]);
        var FC=parseInt(cmd[3]);
        var totaldiff=parseInt(cmd[4]);
    //  DICE
        var base=parseInt(cmd[1]);
    //  ICON
        var actionicon="{{momentumicon=1}}";
    //  HARMS
        
    
    // Check CMDs for validity or set defaults
        if (isNaN(base)) {
            base=2;
        }
        if (skillname==""){
            var skillname="Skill check";
        }
    
    //set up and make the roll.
    
        var d20roll;
        var success=0;
        var complications=0;
        var totaldice=base;
        var forsuc=0;
        var dierollstring="";
        var fortunedice=0;
        var genmomentum=0;
    
        if(totaldice+fortunedice>5){
            sendChat(msg.who,"Too many dice.");
        } else {
            if (FC>0){
                forsuc=fortunedice*2;
                success=success+fortunedice*2;
            }
            for (i=0;i<totaldice;i++){
                d20roll=Math.floor(Math.random() * 20)+1;    
    
                if (d20roll<=TN){
                    success=success+1;
                    if (d20roll<=FC){
                        success=success+1
                        dierollstring=dierollstring + "<span style='color:#1CE20C;text-decoration:underline'>"+d20roll.toString() +"</span>, ";
                    } else {
                        dierollstring=dierollstring + "<span style='color:#1A8B11'>"+d20roll.toString() +"</span>, ";
                    }
                } else if (d20roll>=20) {
                    complications=complications+1;
                dierollstring=dierollstring + "<span style='color:red'>"+d20roll.toString() +"</span>, ";
                } else if ((d20roll>=19) && (FC<=0)){
                    complications=complications+1;
                dierollstring=dierollstring + "<span style='color:red'>"+d20roll.toString() +"</span>, ";
                } else {
                dierollstring=dierollstring + "<span style='color:#C4BEBC'>"+d20roll.toString() +"</span>, ";
                }
            }
            if (success>=totaldiff){
                var succeedfail ="{{SUCCEED=1}}";
                var genmomentum=success-totaldiff;
            } else {
                var succeedfail ="{{FAIL=1}}";
            }
            
            for (i=0;i<fortunedice;i++){
                dierollstring=dierollstring + "1, ";  
            }
            
            var diestring=dierollstring.slice(0, -2);
            
            var rollname="{{name="+PC_name+"}}";
            var basedice="{{dice="+totaldice+"}}";
            var rollskill="{{skill="+skill_name+"}}";
            var rolldiff="{{diff="+totaldiff+"}}";
            var tsuccess="{{tsuccess="+success+"}}";
            var dierolls="{{rolls="+diestring+"}}";
            var result="{{result="+success+"}}";
    //        var rollspent="{{spentmomentum="+momdice+"}}";
            var genmom="{{genmom="+genmomentum+"}}";
            var comp="{{complications="+complications+"}}";
    //        var momchoice="?{How much?|"+genmomentum+"}";
            //var button="{{button=[Keep Momentum](!keepmomentum "+PlayerID+" "+momchoice+")}}";
    
            var rollresult="&{template:conanroll}"+succeedfail+actionicon+rollname+basedice+rollskill+rolldiff+tsuccess+dierolls+result+genmom+comp;
            sendChat(msg.who, rollresult);
        }
    }
    catch(err){
        
    }
});


on("chat:message", function(msg) {
    //!adddoom GM amount
    var cmdName="!adddoom";
    var msgTxt=msg.content;
    var cmd=msgTxt.split(" ");
    if(msg.type !== "api") return;
    if(cmd[0]!==cmdName) return;
    try{
        var GM = findObjs({ type: 'character', name: cmd[1] })[0];
        var val = cmd[2];
        if (GM!== undefined){
            var gmmomentum = findObjs({ type: 'attribute', characterid: GM.id, name: 'doom' })[0];
            var GMmom = parseInt(gmmomentum.get('current'));
            var amount = parseInt(val);
            var newmomentum=GMmom+amount;
            if (newmomentum<0){
                newmomentum=0;
            }
            gmmomentum.set('current',newmomentum);
            sendChat(msg.who, "Doom is increased by "+val+" and now sits at "+newmomentum);
        }
        else{
            sendChat(msg.who, "Couldn't find "+cmd[1]);
        }
    }
    catch(err){
        
    }
});

on("chat:message", function(msg) {
    //!subtractdoom GM amount
    var cmdName="!subtractdoom";
    var msgTxt=msg.content;
    var cmd=msgTxt.split(" ");
    if(msg.type !== "api") return;
    if(cmd[0]!==cmdName) return;
    try{
        var GM = findObjs({ type: 'character', name: cmd[1] })[0];
        var val = cmd[2];
        if (GM!== undefined){
            var gmmomentum = findObjs({ type: 'attribute', characterid: GM.id, name: 'doom' })[0];
            var GMmom = parseInt(gmmomentum.get('current'));
            var amount = parseInt(val);
            var newmomentum=GMmom-amount;
            if (newmomentum<0){
                newmomentum=0;
            }
            gmmomentum.set('current',newmomentum);
            sendChat(msg.who, "Doom is decreased by "+val+" and now sits at "+newmomentum);
        }
        else{
            sendChat(msg.who, "Couldn't find "+cmd[1]);
        }
    }
    catch(err){
        
    }
});

on("chat:message", function(msg) {
  //!doom GM amount
    var cmdName="!doom";
    var msgTxt=msg.content;
    var cmd=msgTxt.split(" ");
    if(msg.type !== "api") return;
    if(cmd[0]!==cmdName) return;
    try {
        var doomspend=parseInt(cmd[2]);
        var GM = findObjs({ type: 'character', name: cmd[1] })[0];
        var gmdoom = findObjs({ type: 'attribute', characterid: GM.id, name: 'doom' })[0];
        var currentdoom=gmdoom.get('current');
        if (currentdoom-doomspend>0){
            sendChat(msg.who,"&{template:doomspend}{{header=!!DOOM!!}}{{doom="+doomspend+"}}");
            currentdoom=currentdoom-doomspend;
        } else {
            sendChat(msg.who,"NOT ENOUGH DOOM!");
        }
        gmdoom.set('current',currentdoom);
    }
    catch(err){
        
    }
});
on("chat:message", function(msg) {
    //!addplayer GMPANEL CharacterID SectionID
    
    //repeating_players_X_playerID
    //repeating_players_X_playername
    
    var cmdName="!addplayer";
    var msgTxt=msg.content;
    var cmd=msgTxt.split(" ");
    if(msg.type !== "api") return;
    if(cmd[0]!==cmdName) return;
    try {
        var GMpanel=cmd[1];
        var playerid=cmd[2];
        var sectionid=cmd[3];
        if (cmd[2]!==undefined && cmd[1]!==undefined && cmd[3]!==undefined){
            var PC_name=getAttrByName(playerid, 'character_name');
            var gmpanel = findObjs({ type: 'character', name: cmd[1] })[0];
    
            var attribname='repeating_players_'+cmd[3]+'_playername';
            var idname='repeating_players_'+cmd[3]+'_playerID';
            
            var sectionplayername=findObjs({ _type: "attribute", _characterid: gmpanel.id,name:attribname},{caseInsensitive: true})[0];
            var sectionplayerID=findObjs({ _type: "attribute", _characterid: gmpanel.id,name:idname},{caseInsensitive: true})[0];
    
     
            sectionplayername.set('current',PC_name);
            sectionplayerID.set('current',playerid);
    
    
        } else {
            sendChat(msg.who,"=> !addplayer GM PLAYERID SECTIONID");
        }
    }
    catch (err) {
        sendChat(msg.who,err.message);
        
    }

});

on("chat:message", function(msg){
    //!readmomentum GMPANEL
    
    var cmdName="!readmomentum"
    var msgTxt=msg.content;
    var cmd=msgTxt.split(" ");
    if(msg.type !== "api") return;
    if(cmd[0]!==cmdName) return;
    try{
        if (cmd[1]!==undefined){
            // GET OBJECT for GMPANEL
            var gmpanel = findObjs({ type: 'character', name: cmd[1] })[0];
            // Get ALL attribs from the GM Object
            var panelattribs=findObjs({ _type: "attribute", _characterid: gmpanel.id},{caseInsensitive: true});
            //Filter based on "Repeating_players" and the end of the repeating section name
            var playerids = panelattribs.filter(function (e) {
                return (e.get("name").slice(-8)=="playerID" && e.get("name").substring(0,17)=="repeating_players");
            });
            var playermom = panelattribs.filter(function (e) {
                return (e.get("name").slice(-16)=="GMPlayermomentum" && e.get("name").substring(0,17)=="repeating_players");
            });
            var playerfor = panelattribs.filter(function (e) {
                return (e.get("name").slice(-15)=="GMPlayerfortune" && e.get("name").substring(0,17)=="repeating_players");
            });

            //for (var i=0;i<panelattribs.length;i++){
            //    var x=panelattribs[i].get("name");
            //    sendChat("debug",x);
            //}
            //sendChat("Debug",playerfor.length.toString());
            // Set
            var pid;
            for (var i=0;i<playerids.length;i++){
                //Get the first players ID stored in the GMPanel table.
                pid=playerids[i].get("current");
                //Get the name of the momentum in the row, ie Repeating_players_[SECTIONID]_GMPlayermomentum
                rowmomentum=playermom[i].get("name");
                rowfortune=playerfor[i].get("name")
                //Find the object based on the above name
                var rowmom=findObjs({ type: "attribute", characterid:gmpanel.id, name:rowmomentum},{caseInsensitive: true})[0];
                var rowfor=findObjs({ type: "attribute", characterid:gmpanel.id, name:rowfortune},{caseInsensitive: true})[0];
                //Get the momentum stored on a character sheet.
                var PCcurrentMom=getAttrByName(pid, 'momentum');
                var PCcurrentFor=getAttrByName(pid, 'fortune');
                //Update the GMpanel Momentum rows.
                rowmom.set("current",PCcurrentMom);
                rowfor.set("current",PCcurrentFor);
            }
        }
    }
    catch (err){
        sendChat(msg.who,err.message);
    }
});

on("chat:message", function(msg) {
    //!help
    var cmdName="!help";
    var msgTxt=msg.content;
    var cmd=msgTxt.split(" ");
    if(msg.type !== "api") return;
    if(cmd[0]!==cmdName) return;
    sendChat(msg.who,"1. Set up a character named GMPANEL");
    sendChat(msg.who,"2. Click Initialize on all new created characters, found on the GM tab of the character sheet.");
    sendChat(msg.who,"")
    sendChat(msg.who,"== Other Useful Commands ==");
    sendChat(msg.who,"=> !subtractdoom GM AMOUNT");
    sendChat(msg.who,"=> !adddoom GM AMOUNT");
    sendChat(msg.who,"=> !reportdoom GM");
    sendChat(msg.who,"=> !2d20 DICE TN FC DIFF");
    sendChat(msg.who,"=> !doom GM AMOUNT");
});
