import { NextRequest, NextResponse } from "next/server";

const checkRecaptcha = async (recaptchaToken: string, remoteip) => {
    const recaptchaResponse = await fetch(
        'https://www.google.com/recaptcha/api/siteverify',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                secret: process.env.RECAPTCHA_SECRET_KEY!,
                response: recaptchaToken,
                remoteip,
            }),
        }
    );

    const verification = await recaptchaResponse.json();

    const recaptchaThreshold = 0.5;

    return verification.success && verification.score >= recaptchaThreshold;
};

export async function POST(request: NextRequest) {
    const body = await request.json();

    const { recaptchaToken, remoteip } = body;

    const isHuman = await checkRecaptcha(recaptchaToken, remoteip);

    if (!isHuman) {
        return new NextResponse('Recaptcha verification failed', {
            status: 403,
        });
    }

    const formData = new FormData();
    formData.append('firstname', body.firstname);
    formData.append('lastname', body.lastname);
    formData.append('email', body.email);
    formData.append('phone', body.phone);
    formData.append('studentNumber', body.studentNumber);
    formData.append('department', body.department);
    formData.append('grade', body.grade);
    formData.append('nationality', body.nationality);

    console.log(formData);

    const response = await fetch(
        process.env.API_URL!,
        {
            method: 'POST',
            body: formData,
        }
    );

    if (!response.ok) {
        return new NextResponse('Form kaydedilemedi!', { status: response.status });
    }

    const result = await response.json();

    return new NextResponse(result, {
        status: 200,
    });
}
