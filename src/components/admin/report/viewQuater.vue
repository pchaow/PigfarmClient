<!----------Make By YourName---------------->
 <template>
<div>
  <h2>ประจำปี {{yearSet}}</h2><br>
    <table class="tg" style="undefined;table-layout: fixed; width: 100%;">
        <colgroup>
            <col style="width: 370px">
            <col style="width: 33px">
            <col style="width: 53px">
            <col style="width: 64px">
            <col style="width: 33px">
            <col style="width: 53px">
            <col style="width: 64px">
            <col style="width: 33px">
            <col style="width: 53px">
            <col style="width: 64px">
            <col style="width: 33px">
            <col style="width: 53px">
            <col style="width: 64px">
            <col style="width: 33px">
            <col style="width: 53px">
            <col style="width: 64px">
        </colgroup>
        <tr>
            <th class="tg-7btt" rowspan="2">ข้อมูลการผลิต</th>
            <th class="tg-7btt" colspan="3">ไตรมาสที่ 1<br>(1 ม.ค.- 31 มี.ค.)</th>
            <th class="tg-7btt" colspan="3">ไตรมาสที่ 2<br>(1 เม.ย.-30 มิ.ย.)</th>
            <th class="tg-7btt" colspan="3">ไตรมาสที่ 3<br>(1 ก.ค. - 30 ก.ย.)</th>
            <th class="tg-7btt" colspan="3">ไตรมาสที่ 4<br>(1 ต.ค.-31 ธ.ค.)</th>
            <th class="tg-7btt" colspan="3">ทั้งปี</th>
        </tr>
        <tr>
            <td class="tg-7btt">เป้า</td>
            <td class="tg-7btt">ทำจริง</td>
            <td class="tg-7btt">แตกต่าง</td>
            <td class="tg-7btt">เป้า</td>
            <td class="tg-7btt">ทำจริง</td>
            <td class="tg-7btt">แตกต่าง</td>
            <td class="tg-7btt">เป้า</td>
            <td class="tg-7btt">ทำจริง</td>
            <td class="tg-7btt">แตกต่าง</td>
            <td class="tg-7btt">เป้า</td>
            <td class="tg-amwm">ทำจริง</td>
            <td class="tg-amwm">แตกต่าง</td>
            <td class="tg-7btt">เป้า</td>
            <td class="tg-amwm">ทำจริง</td>
            <td class="tg-amwm">แตกต่าง</td>
        </tr>
        <tr>
            <td class="tg-0lax">จำนวนแม่พันธุ์ใช้งาน</td>
            <td class="tg-0lax">{{quaterData.goal1.active_breeder}}</td>
            <td class="tg-0lax">{{quaterData.quater1.active_breeder}}</td>
            <td class="tg-0lax">{{quaterData.goal1.active_breeder-quaterData.quater1.active_breeder}}</td>

            <td class="tg-0lax">{{quaterData.goal2.active_breeder}}</td>
            <td class="tg-0lax">{{quaterData.quater2.active_breeder}}</td>
            <td class="tg-0lax">{{quaterData.goal2.active_breeder-quaterData.quater2.active_breeder}}</td>

            <td class="tg-0lax">{{quaterData.goal3.active_breeder}}</td>
            <td class="tg-0lax">{{quaterData.quater3.active_breeder}}</td>
            <td class="tg-0lax">{{quaterData.goal3.active_breeder-quaterData.quater3.active_breeder}}</td>

            <td class="tg-0lax">{{quaterData.goal4.active_breeder}}</td>
            <td class="tg-0lax">{{quaterData.quater4.active_breeder}}</td>
            <td class="tg-0lax">{{quaterData.goal4.active_breeder-quaterData.quater4.active_breeder}}</td>

            <td class="tg-0lax">{{quaterData.year.active_breeder}}</td>
            <td class="tg-0lax">{{quaterData.goalYear.active_breeder}}</td>

            <td class="tg-0lax">{{quaterData.year.active_breeder - quaterData.goalYear.active_breeder}}</td>
            
        </tr>
        <tr>
            <td class="tg-0lax">จำนวนแม่ผสม (สะสม)</td>
            <td class="tg-0lax">{{quaterData.goal1.breeded_breeder}}</td>
            <td class="tg-0lax">{{quaterData.quater1.breeded_breeder}}</td>
            <td class="tg-0lax">{{quaterData.goal1.breeded_breeder-quaterData.quater1.breeded_breeder}}</td>

            <td class="tg-0lax">{{quaterData.goal2.breeded_breeder}}</td>
            <td class="tg-0lax">{{quaterData.quater2.breeded_breeder}}</td>
            <td class="tg-0lax">{{quaterData.goal2.breeded_breeder-quaterData.quater2.breeded_breeder}}</td>

            <td class="tg-0lax">{{quaterData.goal3.breeded_breeder}}</td>
            <td class="tg-0lax">{{quaterData.quater3.breeded_breeder}}</td>
            <td class="tg-0lax">{{quaterData.goal3.breeded_breeder-quaterData.quater3.breeded_breeder}}</td>

            <td class="tg-0lax">{{quaterData.goal4.breeded_breeder}}</td>
            <td class="tg-0lax">{{quaterData.quater4.breeded_breeder}}</td>
            <td class="tg-0lax">{{quaterData.goal4.breeded_breeder-quaterData.quater4.breeded_breeder}}</td>

            <td class="tg-0lax">{{quaterData.year.breeded_breeder}}</td>
            <td class="tg-0lax">{{quaterData.goalYear.breeded_breeder}}</td>

            <td class="tg-0lax">{{quaterData.year.breeded_breeder-quaterData.goalYear.breeded_breeder}}</td>

        </tr>
        <tr>
            <td class="tg-0lax">จำนวนแม่คลอด (สะสม)</td>
            <td class="tg-0lax">{{quaterData.goal1.delivery_breeder}}</td>
            <td class="tg-0lax">{{quaterData.quater1.delivery_breeder}}</td>
            <td class="tg-0lax">{{quaterData.goal1.delivery_breeder-quaterData.quater1.delivery_breeder}}</td>

            <td class="tg-0lax">{{quaterData.goal2.delivery_breeder}}</td>
            <td class="tg-0lax">{{quaterData.quater2.delivery_breeder}}</td>
            <td class="tg-0lax">{{quaterData.goal2.delivery_breeder-quaterData.quater2.delivery_breeder}}</td>

            <td class="tg-0lax">{{quaterData.goal3.delivery_breeder}}</td>
            <td class="tg-0lax">{{quaterData.quater3.delivery_breeder}}</td>
            <td class="tg-0lax">{{quaterData.goal3.delivery_breeder-quaterData.quater3.delivery_breeder}}</td>

            <td class="tg-0lax">{{quaterData.goal4.delivery_breeder}}</td>
            <td class="tg-0lax">{{quaterData.quater4.delivery_breeder}}</td>
            <td class="tg-0lax">{{quaterData.goal4.delivery_breeder-quaterData.quater4.delivery_breeder}}</td>

            <td class="tg-0lax">{{quaterData.year.delivery_breeder}}</td>
            <td class="tg-0lax">{{quaterData.goalYear.delivery_breeder}}</td>

            <td class="tg-0lax">{{quaterData.year.delivery_breeder-quaterData.goalYear.delivery_breeder}}</td>

        </tr>
        <tr>
            <td class="tg-0lax">อัตราเข้าคลอด/ชุดผสม</td>
            <td class="tg-0lax">{{quaterData.goal1.delivery_ratio}}</td>
            <td class="tg-0lax">{{quaterData.quater1.delivery_ratio}}</td>
            <td class="tg-0lax">{{quaterData.goal1.delivery_ratio-quaterData.quater1.delivery_ratio}}</td>

            <td class="tg-0lax">{{quaterData.goal2.delivery_ratio}}</td>
            <td class="tg-0lax">{{quaterData.quater2.delivery_ratio}}</td>
            <td class="tg-0lax">{{quaterData.goal2.delivery_ratio-quaterData.quater2.delivery_ratio}}</td>

            <td class="tg-0lax">{{quaterData.goal3.delivery_ratio}}</td>
            <td class="tg-0lax">{{quaterData.quater3.delivery_ratio}}</td>
            <td class="tg-0lax">{{quaterData.goal3.delivery_ratio-quaterData.quater3.delivery_ratio}}</td>

            <td class="tg-0lax">{{quaterData.goal4.delivery_ratio}}</td>
            <td class="tg-0lax">{{quaterData.quater4.delivery_ratio}}</td>
            <td class="tg-0lax">{{quaterData.goal4.delivery_ratio-quaterData.quater4.delivery_ratio}}</td>

            <td class="tg-0lax">{{quaterData.year.delivery_ratio}}</td>
            <td class="tg-0lax">{{quaterData.goalYear.delivery_ratio}}</td>
            
            <td class="tg-0lax">{{quaterData.year.delivery_ratio-quaterData.goalYear.delivery_ratio}}</td>

        </tr>
        <tr>
            <td class="tg-0lax">จำนวนลูกแรกคลอดทั้งหมดต่อครอก</td>
            <td class="tg-0lax">{{quaterData.goal1.pig_delivered_rate}}</td>
            <td class="tg-0lax">{{quaterData.quater1.pig_delivered_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal1.pig_delivered_rate-quaterData.quater1.pig_delivered_rate}}</td>

            <td class="tg-0lax">{{quaterData.goal2.pig_delivered_rate}}</td>
            <td class="tg-0lax">{{quaterData.quater2.pig_delivered_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal2.pig_delivered_rate-quaterData.quater2.pig_delivered_rate}}</td>

            <td class="tg-0lax">{{quaterData.goal3.pig_delivered_rate}}</td>
            <td class="tg-0lax">{{quaterData.quater3.pig_delivered_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal3.pig_delivered_rate-quaterData.quater3.pig_delivered_rate}}</td>

            <td class="tg-0lax">{{quaterData.goal4.pig_delivered_rate}}</td>
            <td class="tg-0lax">{{quaterData.quater4.pig_delivered_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal4.pig_delivered_rate-quaterData.quater4.pig_delivered_rate}}</td>

            <td class="tg-0lax">{{quaterData.year.pig_delivered_rate}}</td>
            <td class="tg-0lax">{{quaterData.goalYear.pig_delivered_rate}}</td>

            <td class="tg-0lax">{{quaterData.year.pig_delivered_rate-quaterData.goalYear.pig_delivered_rate}}</td>

        </tr>
        <tr>
            <td class="tg-0lax">เปอร์เซ็นต์สูญเสียลูกสุกรแรกคลอด+ลูกกรอก (%)</td>
            <td class="tg-0lax">{{quaterData.goal1.pig_delivered_died_percent}}</td>
            <td class="tg-0lax">{{quaterData.quater1.pig_delivered_died_percent}}</td>
            <td class="tg-0lax">{{quaterData.goal1.pig_delivered_died_percent-quaterData.quater1.pig_delivered_died_percent}}</td>

            <td class="tg-0lax">{{quaterData.goal2.pig_delivered_died_percent}}</td>
            <td class="tg-0lax">{{quaterData.quater2.pig_delivered_died_percent}}</td>
            <td class="tg-0lax">{{quaterData.goal2.pig_delivered_died_percent-quaterData.quater2.pig_delivered_died_percent}}</td>

            <td class="tg-0lax">{{quaterData.goal3.pig_delivered_died_percent}}</td>
            <td class="tg-0lax">{{quaterData.quater3.pig_delivered_died_percent}}</td>
            <td class="tg-0lax">{{quaterData.goal3.pig_delivered_died_percent-quaterData.quater3.pig_delivered_died_percent}}</td>

            <td class="tg-0lax">{{quaterData.goal4.pig_delivered_died_percent}}</td>
            <td class="tg-0lax">{{quaterData.quater4.pig_delivered_died_percent}}</td>
            <td class="tg-0lax">{{quaterData.goal4.pig_delivered_died_percent-quaterData.quater4.pig_delivered_died_percent}}</td>

            <td class="tg-0lax">{{quaterData.year.pig_delivered_died_percent}}</td>
            <td class="tg-0lax">{{quaterData.goalYear.pig_delivered_died_percent}}</td>

            <td class="tg-0lax">{{quaterData.year.pig_delivered_died_percent-quaterData.goalYear.pig_delivered_died_percent}}</td>

        </tr>
        <tr>
            <td class="tg-0lax">จำนวนลูกแรกคลอดมีชีวิตต่อครอก</td>
            <td class="tg-0lax">{{quaterData.goal1.pig_delivered_success_avg}}</td>
            <td class="tg-0lax">{{quaterData.quater1.pig_delivered_success_avg}}</td>
            <td class="tg-0lax">{{quaterData.goal1.pig_delivered_success_avg-quaterData.quater1.pig_delivered_success_avg}}</td>

            <td class="tg-0lax">{{quaterData.goal2.pig_delivered_success_avg}}</td>
            <td class="tg-0lax">{{quaterData.quater2.pig_delivered_success_avg}}</td>
            <td class="tg-0lax">{{quaterData.goal2.pig_delivered_success_avg-quaterData.quater2.pig_delivered_success_avg}}</td>

            <td class="tg-0lax">{{quaterData.goal3.pig_delivered_success_avg}}</td>
            <td class="tg-0lax">{{quaterData.quater3.pig_delivered_success_avg}}</td>
            <td class="tg-0lax">{{quaterData.goal3.pig_delivered_success_avg-quaterData.quater3.pig_delivered_success_avg}}</td>

            <td class="tg-0lax">{{quaterData.goal4.pig_delivered_success_avg}}</td>
            <td class="tg-0lax">{{quaterData.quater4.pig_delivered_success_avg}}</td>
            <td class="tg-0lax">{{quaterData.goal4.pig_delivered_success_avg-quaterData.quater4.pig_delivered_success_avg}}</td>

            <td class="tg-0lax">{{quaterData.year.pig_delivered_success_avg}}</td>
            <td class="tg-0lax">{{quaterData.goalYear.pig_delivered_success_avg}}</td>

            <td class="tg-0lax">{{quaterData.year.pig_delivered_success_avg-quaterData.goalYear.pig_delivered_success_avg}}</td>

        </tr>
        <tr>
            <td class="tg-0lax">เฉลี่ยน้ำหนักแรกคลอด/ตัว</td>
            <td class="tg-0lax">{{quaterData.goal1.pig_delivered_weight}}</td>
            <td class="tg-0lax">{{quaterData.quater1.pig_delivered_weight}}</td>
            <td class="tg-0lax">{{quaterData.goal1.pig_delivered_weight-quaterData.quater1.pig_delivered_weight}}</td>

            <td class="tg-0lax">{{quaterData.goal2.pig_delivered_weight}}</td>
            <td class="tg-0lax">{{quaterData.quater2.pig_delivered_weight}}</td>
            <td class="tg-0lax">{{quaterData.goal2.pig_delivered_weight-quaterData.quater2.pig_delivered_weight}}</td>

            <td class="tg-0lax">{{quaterData.goal3.pig_delivered_weight}}</td>
            <td class="tg-0lax">{{quaterData.quater3.pig_delivered_weight}}</td>
            <td class="tg-0lax">{{quaterData.goal3.pig_delivered_weight-quaterData.quater3.pig_delivered_weight}}</td>

            <td class="tg-0lax">{{quaterData.goal4.pig_delivered_weight}}</td>
            <td class="tg-0lax">{{quaterData.quater4.pig_delivered_weight}}</td>
            <td class="tg-0lax">{{quaterData.goal4.pig_delivered_weight-quaterData.quater4.pig_delivered_weight}}</td>

            <td class="tg-0lax">{{quaterData.year.pig_delivered_weight}}</td>
            <td class="tg-0lax">{{quaterData.goalYear.pig_delivered_weight}}</td>

            <td class="tg-0lax">{{quaterData.year.pig_delivered_weight-quaterData.goalYear.pig_delivered_weight}}</td>

        </tr>
        <tr>
            <td class="tg-0lax">เปอร์เซ็นต์สูญเสียลูกสุกรก่อนหย่านม(%)</td>
            <td class="tg-0lax">{{quaterData.goal1.pig_raising_failed_perent}}</td>
            <td class="tg-0lax">{{quaterData.quater1.pig_raising_failed_perent}}</td>
            <td class="tg-0lax">{{quaterData.goal1.pig_raising_failed_perent-quaterData.quater1.pig_raising_failed_perent}}</td>

            <td class="tg-0lax">{{quaterData.goal2.pig_raising_failed_perent}}</td>
            <td class="tg-0lax">{{quaterData.quater2.pig_raising_failed_perent}}</td>
            <td class="tg-0lax">{{quaterData.goal2.pig_raising_failed_perent-quaterData.quater2.pig_raising_failed_perent}}</td>

            <td class="tg-0lax">{{quaterData.goal3.pig_raising_failed_perent}}</td>
            <td class="tg-0lax">{{quaterData.quater3.pig_raising_failed_perent}}</td>
            <td class="tg-0lax">{{quaterData.goal3.pig_raising_failed_perent-quaterData.quater3.pig_raising_failed_perent}}</td>

            <td class="tg-0lax">{{quaterData.goal4.pig_raising_failed_perent}}</td>
            <td class="tg-0lax">{{quaterData.quater4.pig_raising_failed_perent}}</td>
            <td class="tg-0lax">{{quaterData.goal4.pig_raising_failed_perent-quaterData.quater4.pig_raising_failed_perent}}</td>

            <td class="tg-0lax">{{quaterData.year.pig_raising_failed_perent}}</td>
            <td class="tg-0lax">{{quaterData.goalYear.pig_raising_failed_perent}}</td>

            <td class="tg-0lax">{{quaterData.year.pig_raising_failed_perent-quaterData.goalYear.pig_raising_failed_perent}}</td>

        </tr>
        <tr>
            <td class="tg-0lax">จำนวนแม่หย่านม (สะสม)</td>
            <td class="tg-0lax">{{quaterData.goal1.ween_breeder}}</td>
            <td class="tg-0lax">{{quaterData.quater1.ween_breeder}}</td>
            <td class="tg-0lax">{{quaterData.goal1.ween_breeder-quaterData.quater1.ween_breeder}}</td>

            <td class="tg-0lax">{{quaterData.goal2.ween_breeder}}</td>
            <td class="tg-0lax">{{quaterData.quater2.ween_breeder}}</td>
            <td class="tg-0lax">{{quaterData.goal2.ween_breeder-quaterData.quater2.ween_breeder}}</td>

            <td class="tg-0lax">{{quaterData.goal3.ween_breeder}}</td>
            <td class="tg-0lax">{{quaterData.quater3.ween_breeder}}</td>
            <td class="tg-0lax">{{quaterData.goal3.ween_breeder-quaterData.quater3.ween_breeder}}</td>

            <td class="tg-0lax">{{quaterData.goal4.ween_breeder}}</td>
            <td class="tg-0lax">{{quaterData.quater4.ween_breeder}}</td>
            <td class="tg-0lax">{{quaterData.goal4.ween_breeder-quaterData.quater4.ween_breeder}}</td>

            <td class="tg-0lax">{{quaterData.year.ween_breeder}}</td>
            <td class="tg-0lax">{{quaterData.goalYear.ween_breeder}}</td>

            <td class="tg-0lax">{{quaterData.year.ween_breeder-quaterData.goalYear.ween_breeder}}</td>

        </tr>
        <tr>
            <td class="tg-0lax">จำนวนลูกหย่านมทั้งหมด</td>
            <td class="tg-0lax">{{quaterData.goal1.pig_ween_number}}</td>
            <td class="tg-0lax">{{quaterData.quater1.pig_ween_number}}</td>
            <td class="tg-0lax">{{quaterData.goal1.pig_ween_number-quaterData.quater1.pig_ween_number}}</td>

            <td class="tg-0lax">{{quaterData.goal2.pig_ween_number}}</td>
            <td class="tg-0lax">{{quaterData.quater2.pig_ween_number}}</td>
            <td class="tg-0lax">{{quaterData.goal2.pig_ween_number-quaterData.quater2.pig_ween_number}}</td>

            <td class="tg-0lax">{{quaterData.goal3.pig_ween_number}}</td>
            <td class="tg-0lax">{{quaterData.quater3.pig_ween_number}}</td>
            <td class="tg-0lax">{{quaterData.goal3.pig_ween_number-quaterData.quater3.pig_ween_number}}</td>

            <td class="tg-0lax">{{quaterData.goal4.pig_ween_number}}</td>
            <td class="tg-0lax">{{quaterData.quater4.pig_ween_number}}</td>
            <td class="tg-0lax">{{quaterData.goal4.pig_ween_number-quaterData.quater4.pig_ween_number}}</td>

            <td class="tg-0lax">{{quaterData.year.pig_ween_number}}</td>
            <td class="tg-0lax">{{quaterData.goalYear.pig_ween_number}}</td>

            <td class="tg-0lax">{{quaterData.year.pig_ween_number-quaterData.goalYear.pig_ween_number}}</td>

        </tr>
        <tr>
            <td class="tg-0lax">จำนวนลูกหย่านม/ครอก</td>
            <td class="tg-0lax">{{quaterData.goal1.pig_ween_rate}}</td>
            <td class="tg-0lax">{{quaterData.quater1.pig_ween_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal1.pig_ween_rate-quaterData.quater1.pig_ween_rate}}</td>

            <td class="tg-0lax">{{quaterData.goal2.pig_ween_rate}}</td>
            <td class="tg-0lax">{{quaterData.quater2.pig_ween_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal2.pig_ween_rate-quaterData.quater2.pig_ween_rate}}</td>

            <td class="tg-0lax">{{quaterData.goal3.pig_ween_rate}}</td>
            <td class="tg-0lax">{{quaterData.quater3.pig_ween_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal3.pig_ween_rate-quaterData.quater3.pig_ween_rate}}</td>

            <td class="tg-0lax">{{quaterData.goal4.pig_ween_rate}}</td>
            <td class="tg-0lax">{{quaterData.quater4.pig_ween_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal4.pig_ween_rate-quaterData.quater4.pig_ween_rate}}</td>

            <td class="tg-0lax">{{quaterData.year.pig_ween_rate}}</td>
            <td class="tg-0lax">{{quaterData.goalYear.pig_ween_rate}}</td>

            <td class="tg-0lax">{{quaterData.year.pig_ween_rate-quaterData.goalYear.pig_ween_rate}}</td>

        </tr>
        <tr>
            <td class="tg-0lax">เฉลี่ยน้ำหนักหย่านม/ตัว</td>
            <td class="tg-0lax">{{quaterData.goal1.pig_ween_weight_avg}}</td>
            <td class="tg-0lax">{{quaterData.quater1.pig_ween_weight_avg}}</td>
            <td class="tg-0lax">{{quaterData.goal1.pig_ween_weight_avg-quaterData.quater1.pig_ween_weight_avg}}</td>

            <td class="tg-0lax">{{quaterData.goal2.pig_ween_weight_avg}}</td>
            <td class="tg-0lax">{{quaterData.quater2.pig_ween_weight_avg}}</td>
            <td class="tg-0lax">{{quaterData.goal2.pig_ween_weight_avg-quaterData.quater2.pig_ween_weight_avg}}</td>

            <td class="tg-0lax">{{quaterData.goal3.pig_ween_weight_avg}}</td>
            <td class="tg-0lax">{{quaterData.quater3.pig_ween_weight_avg}}</td>
            <td class="tg-0lax">{{quaterData.goal3.pig_ween_weight_avg-quaterData.quater3.pig_ween_weight_avg}}</td>

            <td class="tg-0lax">{{quaterData.goal4.pig_ween_weight_avg}}</td>
            <td class="tg-0lax">{{quaterData.quater4.pig_ween_weight_avg}}</td>
            <td class="tg-0lax">{{quaterData.goal4.pig_ween_weight_avg-quaterData.quater4.pig_ween_weight_avg}}</td>

            <td class="tg-0lax">{{quaterData.year.pig_ween_weight_avg}}</td>
            <td class="tg-0lax">{{quaterData.goalYear.pig_ween_weight_avg}}</td>

            <td class="tg-0lax">{{quaterData.year.pig_ween_weight_avg-quaterData.goalYear.pig_ween_weight_avg}}</td>

        </tr>
        <tr>
            <td class="tg-0lax">จำนวนครอก/แม่/ปี</td>
            <td class="tg-0lax">{{quaterData.goal1.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.quater1.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal1.delivered_breeder_rate-quaterData.quater1.delivered_breeder_rate}}</td>

            <td class="tg-0lax">{{quaterData.goal2.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.quater2.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal2.delivered_breeder_rate-quaterData.quater2.delivered_breeder_rate}}</td>

            <td class="tg-0lax">{{quaterData.goal3.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.quater3.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal3.delivered_breeder_rate-quaterData.quater3.delivered_breeder_rate}}</td>

            <td class="tg-0lax">{{quaterData.goal4.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.quater4.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal4.delivered_breeder_rate-quaterData.quater4.delivered_breeder_rate}}</td>

            <td class="tg-0lax">{{quaterData.year.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.goalYear.delivered_breeder_rate}}</td>

            <td class="tg-0lax">{{quaterData.year.delivered_breeder_rate-quaterData.goalYear.delivered_breeder_rate}}</td>

        </tr>
        <tr>
            <td class="tg-0lax">จำนวนลูกลูกหย่านม/แม่/ปี (PSY)</td>
            <td class="tg-0lax">{{quaterData.goal1.pig_ween_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.quater1.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal1.delivered_breeder_rate-quaterData.quater1.delivered_breeder_rate}}</td>

            <td class="tg-0lax">{{quaterData.goal2.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.quater2.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal2.delivered_breeder_rate-quaterData.quater2.delivered_breeder_rate}}</td>

            <td class="tg-0lax">{{quaterData.goal3.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.quater3.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal3.delivered_breeder_rate-quaterData.quater3.delivered_breeder_rate}}</td>

            <td class="tg-0lax">{{quaterData.goal4.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.quater4.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal4.delivered_breeder_rate-quaterData.quater4.delivered_breeder_rate}}</td>

            <td class="tg-0lax">{{quaterData.year.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.goalYear.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.year.delivered_breeder_rate-quaterData.goalYear.delivered_breeder_rate}}</td>

        </tr>
        <tr>
            <td class="tg-0lax">จำนวนสุกรขุนต่อแม่ต่อปี (9%) (MSY)</td>
            <td class="tg-0lax">-</td>
            <td class="tg-0lax">-</td>
            <td class="tg-0lax">-</td>
            <td class="tg-0lax">-</td>
            <td class="tg-0lax">-</td>
            <td class="tg-0lax">-</td>
            <td class="tg-0lax">-</td>
            <td class="tg-0lax">-</td>
            <td class="tg-0lax">-</td>
            <td class="tg-0lax">-</td>
            <td class="tg-0lax">-</td>
            <td class="tg-0lax">-</td>
            <td class="tg-0lax">-</td>
            <td class="tg-0lax">-</td>
            <td class="tg-0lax">-</td>
        </tr>
        <tr>
            <td class="tg-0lax">% สุกรสาวทดแทน</td>
            <td class="tg-0lax">{{quaterData.goal1.breeder_replace_number}}</td>
            <td class="tg-0lax">{{quaterData.quater1.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal1.delivered_breeder_rate-quaterData.quater1.delivered_breeder_rate}}</td>

            <td class="tg-0lax">{{quaterData.goal2.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.quater2.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal2.delivered_breeder_rate-quaterData.quater2.delivered_breeder_rate}}</td>

            <td class="tg-0lax">{{quaterData.goal3.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.quater3.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal3.delivered_breeder_rate-quaterData.quater3.delivered_breeder_rate}}</td>

            <td class="tg-0lax">{{quaterData.goal4.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.quater4.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal4.delivered_breeder_rate-quaterData.quater4.delivered_breeder_rate}}</td>

            <td class="tg-0lax">{{quaterData.year.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.goalYear.delivered_breeder_rate}}</td>
            
            <td class="tg-0lax">{{quaterData.year.delivered_breeder_rate-quaterData.goalYear.delivered_breeder_rate}}</td>

        </tr>
        <tr>
            <td class="tg-0lax">% แม่สุกรคัดทิ้ง</td>
            <td class="tg-0lax">{{quaterData.goal1.breeder_drop_percent}}</td>
            <td class="tg-0lax">{{quaterData.quater1.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal1.delivered_breeder_rate-quaterData.quater1.delivered_breeder_rate}}</td>

            <td class="tg-0lax">{{quaterData.goal2.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.quater2.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal2.delivered_breeder_rate-quaterData.quater2.delivered_breeder_rate}}</td>

            <td class="tg-0lax">{{quaterData.goal3.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.quater3.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal3.delivered_breeder_rate-quaterData.quater3.delivered_breeder_rate}}</td>

            <td class="tg-0lax">{{quaterData.goal4.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.quater4.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal4.delivered_breeder_rate-quaterData.quater4.delivered_breeder_rate}}</td>

            <td class="tg-0lax">{{quaterData.year.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.goalYear.delivered_breeder_rate}}</td>

            <td class="tg-0lax">{{quaterData.year.delivered_breeder_rate-quaterData.goalYear.delivered_breeder_rate}}</td>

        </tr>
        <tr>
            <td class="tg-0lax">+/- แม่ทดแทนกับแม่คัดทิ้ง</td>
            <td class="tg-0lax">{{quaterData.goal1.breeder_replace_drop_sum}}</td>
            <td class="tg-0lax">{{quaterData.quater1.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal1.delivered_breeder_rate-quaterData.quater1.delivered_breeder_rate}}</td>

            <td class="tg-0lax">{{quaterData.goal2.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.quater2.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal2.delivered_breeder_rate-quaterData.quater2.delivered_breeder_rate}}</td>

            <td class="tg-0lax">{{quaterData.goal3.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.quater3.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal3.delivered_breeder_rate-quaterData.quater3.delivered_breeder_rate}}</td>

            <td class="tg-0lax">{{quaterData.goal4.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.quater4.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.goal4.delivered_breeder_rate-quaterData.quater4.delivered_breeder_rate}}</td>

            <td class="tg-0lax">{{quaterData.year.delivered_breeder_rate}}</td>
            <td class="tg-0lax">{{quaterData.goalYear.delivered_breeder_rate}}</td>

            <td class="tg-0lax">{{quaterData.year.delivered_breeder_rate-quaterData.goalYear.delivered_breeder_rate}}</td>

        </tr>
    </table>
</div>
</template>

<script>
import {
    get,
    sync,
    call
} from "vuex-pathify";
export default {
    name: 'Root',
    /*-------------------------Load Component---------------------------------------*/
    components: {

    },
    /*-------------------------Set Component---------------------------------------*/
    props: {

    },
    /*-------------------------DataVarible---------------------------------------*/
    data() {
        return {
            mode: false,
        };
    },
    /*-------------------------Run Methods when Start this Page------------------------------------------*/
    async mounted() {
        /**** Call loading methods*/
        this.load();
    },
    /*-------------------------Run Methods when Start Routed------------------------------------------*/
    async beforeRouteEnter(to, from, next) {
        next()
    },
    /*-------------------------Vuex Methods and Couputed Methods------------------------------------------*/
    computed: {
        ...sync('quater/*')
    },
    /*-------------------------Methods------------------------------------------*/
    methods: {
        ...call('quater/*'),
        /******* Methods default run ******/
        load: async function () {}
    },
}
</script>

<style>
.tg {
    border-collapse: collapse;
    border-spacing: 0;
}

.tg td {
    font-family: Arial, sans-serif;
    font-size: 14px;
    padding: 10px 5px;
    border-style: solid;
    border-width: 1px;
    overflow: hidden;
    word-break: normal;
    border-color: black;
}

.tg th {
    font-family: Arial, sans-serif;
    font-size: 14px;
    font-weight: normal;
    padding: 10px 5px;
    border-style: solid;
    border-width: 1px;
    overflow: hidden;
    word-break: normal;
    border-color: black;
}

.tg .tg-7btt {
    font-weight: bold;
    border-color: inherit;
    text-align: center;
    vertical-align: top
}

.tg .tg-amwm {
    font-weight: bold;
    text-align: center;
    vertical-align: top
}

.tg .tg-0lax {
    text-align: left;
    vertical-align: top
}
</style>
