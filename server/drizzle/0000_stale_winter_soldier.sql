CREATE TABLE "clicks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"urlId" uuid,
	"timestamp" timestamp DEFAULT now(),
	"ip_address" varchar(255),
	"referrer" varchar(255),
	"device" varchar(255),
	"country" varchar(255),
	"city" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "urls" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"shortUrl" varchar(255) NOT NULL,
	"longUrl" text NOT NULL,
	"userId" uuid NOT NULL,
	"expires_at" timestamp,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp,
	CONSTRAINT "urls_shortUrl_unique" UNIQUE("shortUrl")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"firstName" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"isVerified" boolean DEFAULT false,
	"termsAccepted" boolean DEFAULT false NOT NULL,
	"verificationToken" varchar(255),
	"resetPasswordOtp" varchar(6),
	"resetPasswordOtpExpiry" timestamp,
	"tier" varchar(20) DEFAULT 'free' NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "clicks" ADD CONSTRAINT "clicks_urlId_urls_id_fk" FOREIGN KEY ("urlId") REFERENCES "public"."urls"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "urls" ADD CONSTRAINT "urls_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;