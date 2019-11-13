function getDisclosureDesc(code: string) {
  switch (code) {
    case "100":
      return "You first acquire a notifiable interest because:";
    case "1001":
      return "you purchased the shares";
    case "1002":
      return "you purchased the shareiyou were given the shares";
    case "1003":
      return "you became the holder of, wrote or issued equity derivatives under which (choose one):";
    case "10031":
      return "you have a right to take the underlying shares";
    case "10032":
      return "you are under an obligation to take the underlying shares";
    case "10033":
      return "you have a right to receive from another person an amount if the price of the underlying shares is above a certain level";
    case "10034":
      return "you are under an obligation to pay another person an amount if the price of the underlying shares is below a certain level";
    case "10035":
      return "you have any of the rights or obligations referred to in 10031 to 10034 above embedded in a contract or instrument";
    case "1004":
      return "you acquired a security interest in the shares";
    case "1005":
      return "you inherited the shares";
    case "1006":
      return "you became a beneficiary under a trust interested in the shares";
    case "1007":
      return "you took steps to enforce your rights in the shares you hold by way of security as a qualified lender";
    case "1009":
      return "you entered into an agreement for the exchange of an instrument for another instrument in respect of the same underlying shares";
    case "1010":
      return "you were placed the shares as a placee under a top-up placing";
    case "1011":
      return "new shares were issued to you after you have reduced your interest in shares by placing them to placee(s) under a top-up placing";
    case "1012":
      return "you became a member of a concert party group or a member of the concert party group acquired more of the shares";
    case "1013":
      return "any other event (you must briefly describe the relevant event in the Supplementary Information box)";
    case "110":
      return "The percentage level of your interest in the shares has increased because:";
    case "1101":
      return "you purchased the shares";
    case "1102":
      return "you were given the shares";
    case "1103":
      return "you became the holder of, wrote or issued equity derivatives under which (choose one):";
    case "11031":
      return "you have a right to take the underlying shares";
    case "11032":
      return "you are under an obligation to take the underlying shares";
    case "11033":
      return "you have a right to receive from another person an amount if the price of the underlying shares is above a certain level";
    case "11034":
      return "you are under an obligation to pay another person an amount if the price of the underlying shares is below a certain level";
    case "11035":
      return "you have any of the rights or obligations referred to in 11031 to 11034 above embedded in a contract or instrument";
    case "1104":
      return "you acquired a security interest in the shares";
    case "1105":
      return "you inherited the shares";
    case "1106":
      return "you became a beneficiary under a trust interested in the shares";
    case "1107":
      return "you took steps to enforce your rights in the shares you hold by way of security as a qualified lender";
    case "1109":
      return "you entered into an agreement for the exchange of an instrument for another instrument in respect of the same underlying shares";
    case "1110":
      return "you were placed the shares as a placee under a top-up placing";
    case "1111":
      return "new shares were issued to you after you have reduced your interest in shares by placing them to placee(s) under a top-up placing";
    case "1112":
      return "you became a member of a concert party group or a member of the concert party group acquired more of the shares";
    case "1113":
      return "any other event (you must briefly describe the relevant event in the Supplementary Information box)";
    case "120":
      return "The percentage level of your interest in the shares has reduced because:";
    case "1201":
      return "you completed a sale of the shares";
    case "1202":
      return "you made a gift of the shares";
    case "1203":
      return "you delivered the shares or an amount due under equity derivatives";
    case "1204":
      return "expiry or cancellation without exercise of equity derivatives under which (choose one):";
    case "12041":
      return "you had a right to take the underlying shares";
    case "12042":
      return "you were under an obligation to take the underlying shares";
    case "12043":
      return "you had a right to receive from another person an amount if the price of the underlying shares was above a certain level";
    case "12044":
      return "you were under an obligation to pay another person an amount if the price of the underlying shares was below a certain level";
    case "12045":
      return "you had any of the rights or obligations referred to in 12041 to 12044 above embedded in a contract or instrument";
    case "1205":
      return "you ceased to have a security interest in the shares";
    case "1206":
      return "you did not take up, or sold, rights in a rights issue";
    case "1208":
      return "you entered into an agreement for the exchange of an instrument for another instrument in respect of the same underlying shares";
    case "1209":
      return "you placed the shares to placee(s) under a top-up placing";
    case "1210":
      return "new shares were issued in a top-up placing";
    case "1211":
      return "you have ceased to be a member of a concert party group or a member of the concert party group has disposed of some of the shares";
    case "1213":
      return "any other event (you must briefly describe the relevant event in the Supplementary Information box)";
    case "130":
      return "There has been a change in nature of your interest in the shares because:";
    case "1301":
      return "the shares have been delivered to you and you have not previously notified the purchase of the shares";
    case "1302":
      return "you have entered into an agreement for the sale of shares in which you are interested but are not required to deliver them within 4 trading days";
    case "1303":
      return "you have exercised rights to the shares under equity derivatives";
    case "1304":
      return "rights to the shares under equity derivatives have been exercised against you";
    case "1305":
      return "you have provided an interest in the shares as security to a person other than a qualified lender";
    case "1306":
      return "an interest in the shares, that you provided as security to a person other than a qualified lender, has been released";
    case "1307":
      return "you have taken steps to enforce a security interest in the shares, or rights to such shares held as security, and you are not a qualified lender";
    case "1308":
      return "steps have been taken to enforce a security interest in the shares, or rights to such shares held as security, against you";
    case "1309":
      return "you are a beneficiary under a will and the shares have been transferred to you by an executor";
    case "1310":
      return "you are a beneficiary under a trust and the shares have been transferred to you by a trustee";
    case "1311":
      return "you have delivered the shares to a person who had agreed to borrow them";
    case "1312":
      return "the shares lent by you have been returned to you";
    case "1313":
      return "you have lent the shares under a securities borrowing and lending agreement";
    case "1314":
      return "you have recalled the shares under a securities borrowing and lending agreement";
    case "1315":
      return "you have declared a trust over shares that you continue to hold";
    case "1316":
      return "any other event (you must briefly describe the relevant event in the Supplementary Information box)";
    case "140":
      return "You came to have a short position of 1% or more in the shares, or the percentage level of your short position in such shares increased because:";
    case "1401":
      return "you became the holder of, wrote or issued equity derivatives under which (choose one):";
    case "14011":
      return "you have a right to require another person to take delivery of the underlying shares";
    case "14012":
      return "you are under an obligation to deliver the underlying shares";
    case "14013":
      return "you have a right to receive from another person an amount if the price of the underlying shares is below a certain level";
    case "14014":
      return "you are under an obligation to pay another person an amount if the price of the underlying shares is above a certain level";
    case "14015":
      return "you have any of the rights or obligations referred to in 14011 to 14014 above embedded in a contract or instrument";
    case "1402":
      return "you borrowed the shares under a securities borrowing and lending agreement";
    case "1403":
      return "any other event (you must briefly describe the relevant event in the Supplementary Information box)";
    case "150":
      return "You ceased to have a short position of 1% or more in the shares, or the percentage level of your short position in such shares decreased because:";
    case "1501":
      return "expiry or cancellation without exercise of equity derivatives under which (choose one):";
    case "15011":
      return "you have a right to require another person to take delivery of the underlying shares";
    case "15012":
      return "you are under an obligation to deliver the underlying shares";
    case "15013":
      return "you have a right to receive from another person an amount if the price of the underlying shares is below a certain level";
    case "15014":
      return "you are under an obligation to pay another person an amount if the price of the underlying shares is above a certain level";
    case "15015":
      return "you have any of the rights or obligations referred to in 15011 to 15014 above embedded in a contract or instrument";
    case "1502":
      return "you returned the shares borrowed under a securities borrowing and lending agreement";
    case "1503":
      return "any other event (you must briefly describe the relevant event in the Supplementary Information box)";
    case "160":
      return "Approved Lending Agents";
    case "1601":
      return "Notice under section 5(4) of the Securities and Futures (Disclosure of Interests – Securities Borrowing and Lending) Rules by an approved lending agent (choose one):";
    case "16011":
      return "the percentage level of your interest in the shares held in your lending pool is taken to have increased";
    case "16012":
      return "the percentage level of your interest in the shares held in your lending pool is taken to have reduced";
    case "1602":
      return "Notice under section 5(4) of the Securities and Futures (Disclosure of Interests – Securities Borrowing and Lending) Rules by a person that controls an approved lending agent (choose one):";
    case "16021":
      return "the percentage level of your interest in the shares held in the lending pool of the approved lending agent is taken to have increased";
    case "16022":
      return "the percentage level of your interest in the shares held in the lending pool of the approved lending agent is taken to have reduced";
    case "170":
      return "Miscellaneous";
    case "1701":
      return "On listing of the corporation or a class of shares of the listed corporation";
    case "1702":
      return "Notice filed to remove outdated information (if you select this Code you must state the outdated information in the Supplementary Information box and identify the box which contains the updated information)";
    case "1703":
      return "Notice filed because of a change in the threshold for disclosure";
    case "1704":
      return "Notice filed because you ceased to have a notifiable interest in the shares of the listed corporation (you must briefly describe the relevant event in the Supplementary Information box)";
    case "1710":
      return "Voluntary disclosure (you must briefly describe the relevant event in the Supplementary Information box)";
    case "1711":
      return "Other (you must briefly describe the relevant event in the Supplementary Information box)";
    case "2101":
      return "Beneficial owner";
    case "2102":
      return "Investment manager";
    case "2103":
      return "Interests held jointly with another person";
    case "2104":
      return "Agent";
    case "2105":
      return "Underwriter";
    case "2106":
      return "Person having a security interest in shares";
    case "2201":
      return "Interest of corporation controlled by you";
    case "2301":
      return "Trustee";
    case "2302":
      return "Custodian (other than an exempt custodian interest)";
    case "2303":
      return "Depositary";
    case "2304":
      return "Executor or administrator";
    case "2305":
      return "Beneficiary of a trust (other than a discretionary interest)";
    case "2306":
      return "Nominee for another person (other than a bare trustee)";
    case "2307":
      return "Founder of a discretionary trust who can influence how the trustee exercises his discretion";
    case "2401":
      return "A concert party to an agreement to buy shares described in s.317(1)(a)";
    case "2402":
      return "A person making a loan or providing security to buy shares described in s.317(1)(b)";
    case "2501":
      return "Other (you must describe the capacity in the Supplementary Information box)";
    case "2502":
      return "Approved lending agent";
    case "3101":
      return "Cash";
    case "3102":
      return "Assets other than cash";
    case "3103":
      return "Surrender of rights to shares/debentures";
    case "3104":
      return "Services";
    case "4101":
      return "Listed derivatives - Physically settled";
    case "4102":
      return "Listed derivatives - Cash settled";
    case "4103":
      return "Listed derivatives - Convertible instruments";
    case "4104":
      return "Listed derivatives - Other (you must describe the category of derivatives in the Supplementary Information box)";
    case "4105":
      return "Unlisted derivatives - Physically settled";
    case "4106":
      return "Unlisted derivatives - Cash settled";
    case "4107":
      return "Unlisted derivatives - Convertible instruments";
    case "4108":
      return "Unlisted derivatives - Other (you must describe the category of derivatives in the Supplementary Information box)";
    case "5101":
      return "Trustee of a trust";
    case "5102":
      return "Beneficiary of a trust (other than a discretionary interest)";
    case "5103":
      return "Founder of a discretionary trust who can influence how the trustee exercises his discretion";
    case "6101":
      return "Controller is your immediate holding company";
    case "6102":
      return "Controller is your intermediate holding company";
    case "6103":
      return "Controller is your ultimate holding company";
    case "6104":
      return "Controller is a director";
    case "6105":
      return "Controller is a shadow director";
    case "6106":
      return "Other";
  }
}

export default getDisclosureDesc;
