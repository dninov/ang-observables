import { Component, OnInit, OnDestroy } from "@angular/core";
import { interval, Observable, Observer, Subscription } from "rxjs";
import { watch } from "rxjs-watcher";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstSub: Subscription;
  constructor() {}

  ngOnInit() {
    // this.firstSub = interval(1000)
    //   .pipe(watch("Interval (1000)", 10))
    //   .subscribe((count) => {
    //     console.log(count);
    //   });
    const customIntervalObs = Observable.create((observer: Observer<any>) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count == 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error("Count is more then 3"));
        }
        count++;
      }, 1000);
    });
    customIntervalObs.pipe(watch("Interval (1000)", 10)).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        console.log("completed");
      }
    );
  }

  ngOnDestroy() {
    this.firstSub.unsubscribe();
  }
}
