<?php

namespace App\Http\Middleware;

use Closure;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // if ($locale = $this->parseLocale($request)) {
        // }
        $lang = ($request->cookie('locale') ?? app()->getLocale());
        app()->setLocale($lang);
        // dd($lang);
        // dd(app()->getLocale());
        return $next($request);
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function parseLocale($request)
    {
        $locales = config('app.locales');

        $locale = $request->server('HTTP_ACCEPT_LANGUAGE');
        $locale = substr($locale, 0, strpos($locale, ',') ?: strlen($locale));

        if (array_key_exists($locale, $locales)) {
            return $locale;
        }

        $locale = substr($locale, 0, 2);
        // dd($locale);
        if (array_key_exists($locale, $locales)) {
            return $locale;
        }
    }
}
